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
    // Get sales data, total income, and average sales for both dates
    const salesDataA = await this.spfService.getSalesByDate(dateA);
    const salesDataB = await this.spfService.getSalesByDate(dateB);

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
