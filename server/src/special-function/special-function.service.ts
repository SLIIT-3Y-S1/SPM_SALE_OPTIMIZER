import { Injectable } from '@nestjs/common';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';
import { PrismaService } from 'src/database/prisma.service';
import { mean } from 'mathjs'; // Import necessary functions from Math.js

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

    // Calculate total income and average sales
    const totalIncomeraw = salesByHour.reduce(
      (sum, entry) => sum + entry.income,
      0,
    );

    const totalIncome = parseFloat(totalIncomeraw.toFixed(2))

    const averageSales = parseFloat(
      mean(salesByHour.map((entry) => entry.income)).toFixed(2),
    );

    return {
      salesByHour,
      totalIncome,
      averageSales,
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
  
}
