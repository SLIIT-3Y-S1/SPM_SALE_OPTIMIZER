import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecialFunctionService } from './special-function.service';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';

@Controller('special-function')
export class SpecialFunctionController {
  constructor(private readonly spfService: SpecialFunctionService) {}

  @Get('daily-dates')
  async getOrderDates() {
    return this.spfService.getOrderDates();
  }
  @Get('monthly-dates')
  async getOrderMonths() {
    return this.spfService.getOrderMonths();
  }
  @Post('compare-daily')
  async compareDailySales(@Body() body: { dateA: string; dateB: string }) {
    const { dateA, dateB } = body;
    const timeType = 'daily';
    const currency = 'LKR';

    // Get sales data, total income, and average sales for both dates
    const salesDataA = await this.spfService.getSalesByDate(dateA);
    const salesDataB = await this.spfService.getSalesByDate(dateB);

    //generate ai insights
    let openaiGenerate;
    try {
      openaiGenerate = await this.spfService.getInsights(
        timeType,
        currency,
        dateA,
        dateB,
        salesDataA,
        salesDataB,
      );
      console.log('this is the controller' + openaiGenerate.content);
    } catch (error) {
      openaiGenerate = 'An error occurred. Please Check Console.';
      console.log(error);
    }

    // Return the results
    return {
      dateA: {
        date: dateA,
        salesData: salesDataA.salesByHour,
        totalIncome: salesDataA.totalIncome,
        avgSales: salesDataA.averageSales,
      },
      dateB: {
        date: dateB,
        salesData: salesDataB.salesByHour,
        totalIncome: salesDataB.totalIncome,
        avgSales: salesDataB.averageSales,
      },
      aiInsights: {
        response: openaiGenerate.content,
      },
    };
  }

  @Post('compare-monthly')
  async compareMonthlySales(@Body() body: { monthA: string; monthB: string }) {
    const { monthA, monthB } = body;

    // Get sales data, total income, and average sales for both months
    const salesDataA = await this.spfService.getSalesByMonth(monthA);
    const salesDataB = await this.spfService.getSalesByMonth(monthB);

    // Return the results
    return {
      dateA: {
        date: monthA,
        salesData: salesDataA.salesByDay,
        totalIncome: salesDataA.totalIncome,
        avgSales: salesDataA.averageSales,
      },
      dateB: {
        date: monthB,
        salesData: salesDataB.salesByDay,
        totalIncome: salesDataB.totalIncome,
        avgSales: salesDataB.averageSales,
      },
    };
  }
}
