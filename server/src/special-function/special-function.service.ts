import { Injectable } from '@nestjs/common';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';
import { PrismaService } from 'src/database/prisma.service';
import { max, mean, min } from 'mathjs'; // Import necessary functions from Math.js
import { calcOutliersIQR } from './utility-services';
import OpenAI from 'openai';

@Injectable()
export class SpecialFunctionService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderDates() {
    const dates = await this.prisma.order.groupBy({
      by: ['created_at'],
      _count: { created_at: true },
      orderBy: { created_at: 'asc' },
    });

    // Use a Set to store unique dates to avoid duplicates
    const uniqueDatesSet = new Set();

    // Extract only the date part and store in the Set for uniqueness
    dates.forEach((dateObj) => {
      const dateString = dateObj.created_at.toISOString().split('T')[0];
      uniqueDatesSet.add(dateString);
    });

    // Convert the Set back to an Array and sort it
    return Array.from(uniqueDatesSet).sort();
  }

  // Method to get distinct order months in 'YYYY-MM' format
  async getOrderMonths() {
    const dates = await this.prisma.order.findMany({
      select: {
        created_at: true,
      },
    });

    // Format dates to 'YYYY-MM' and remove duplicates
    const months = [
      ...new Set(
        dates.map((dateObj) => dateObj.created_at.toISOString().slice(0, 7)),
      ),
    ];
    return months;
  }

  async getSalesByDate(date: string) {
    const sales = await this.prisma.order.groupBy({
      by: ['created_at'],
      _sum: { total_amount: true },
      where: {
        created_at: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lte: new Date(date + 'T23:59:59.999Z'),
        },
      },
      orderBy: { created_at: 'asc' },
    });

    // Transform the data into a format suitable for calculations
    const salesByHour = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      income: 0,
    }));

    sales.forEach((sale) => {
      const hour = new Date(sale.created_at).getUTCHours();
      salesByHour[hour].income = sale._sum.total_amount;
    });

    const totalIncomeRaw = salesByHour.reduce(
      (sum, entry) => sum + entry.income,
      0,
    ); // Calculate total income
    const totalIncome = parseFloat(totalIncomeRaw.toFixed(2)); //Round off total income

    const averageSales = parseFloat(
      mean(salesByHour.map((entry) => entry.income)).toFixed(2),
    ); //Calculate and round off average sales

    const maxSale = parseFloat(
      max(salesByHour.map((entry) => entry.income)).toFixed(2),
    ); //Calculate and Round off max sales
    const minSale = parseFloat(
      min(salesByHour.map((entry) => entry.income)).toFixed(2),
    ); // Calculate and Round off min sales

    const numTransactions = sales.length; // Get number of transactions

    // Detect outliers using IQR method
    const salesAmounts = salesByHour.map((entry) => entry.income);
    const outliers = calcOutliersIQR(salesAmounts);

    return {
      salesByHour,
      totalIncome,
      averageSales,
      maxSale,
      minSale,
      numTransactions,
      outliers,
    };
  }

  // Process comparision request monthly
  async getSalesByMonth(month: string) {
    const sales = await this.prisma.order.groupBy({
      by: ['created_at'],
      _sum: { total_amount: true },
      where: {
        created_at: {
          gte: new Date(`${month}-01T00:00:00.000Z`),
          lte: new Date(`${month}-31T23:59:59.999Z`), // Handles up to 31 days
        },
      },
      orderBy: { created_at: 'asc' },
    });

    // Group sales by day
    const salesByDay = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      income: 0,
    }));

    sales.forEach((sale) => {
      const day = new Date(sale.created_at).getUTCDate();
      salesByDay[day - 1].income = sale._sum.total_amount;
    });

    // Calculate total income and average sales
    const totalIncomeraw = salesByDay.reduce(
      (sum, entry) => sum + entry.income,
      0,
    );

    const totalIncome = parseFloat(totalIncomeraw.toFixed(2));
    const averageSales = parseFloat(
      mean(salesByDay.map((entry) => entry.income)).toFixed(2),
    );

    return {
      salesByDay,
      totalIncome,
      averageSales,
    };
  }

  async getInsights(
    timeType: string,
    currency: string,
    dateA: string,
    dateB: string,
    salesDataA: {
      salesByHour: { hour: number; income: number }[];
      totalIncome: number;
      averageSales: number;
      maxSale: number;
      minSale: number;
      numTransactions: number;
      outliers: number[];
    },
    salesDataB: {
      salesByHour: { hour: number; income: number }[];
      totalIncome: number;
      averageSales: number;
      maxSale: number;
      minSale: number;
      numTransactions: number;
      outliers: number[];
    },
  ) {
    // Format the outliers as a comma-separated string
    const formatOutliers = (outliers: number[]) => outliers.join(',');

    // Create the prompt content string for both dateA and dateB
    const promptContent = `type: ${timeType}, currency: ${currency}
      Date|Total Sales|No. of transactions|Avg. Sales per type|Max sale|Min Sale|Outliers
      ${dateA}|${salesDataA.totalIncome}|${salesDataA.numTransactions}|${salesDataA.averageSales}|${salesDataA.maxSale}|${salesDataA.minSale}|${formatOutliers(salesDataA.outliers)}
      ${dateB}|${salesDataB.totalIncome}|${salesDataB.numTransactions}|${salesDataB.averageSales}|${salesDataB.maxSale}|${salesDataB.minSale}|${formatOutliers(salesDataB.outliers)}`;

    //connection and request
    const openai = new OpenAI(); 
    /*
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,  // Ensure the API key is set properly
    });

    const openai = new OpenAIApi(configuration);
    */

    async function fetchAIInsights() {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are the sales performance analyst of a fashion retail store. Using given key data points of 2 timelines, provide performance insights separately in points and outline abnormalities',
            },
            {
              role: 'user',
              content: '', // Add user content here
            },
          ],
        });
    
        // Return insights after awaiting the response
        const message = response.choices[0].message;
        console.log(message);
        return message;
    
      } catch (error) {
        console.error('Error fetching AI insights:', error);
        return 'AI service unavailable. Unable to generate insights.';
      }
    }
    
}}
