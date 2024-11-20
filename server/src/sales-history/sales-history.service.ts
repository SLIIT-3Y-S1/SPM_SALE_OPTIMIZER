import { Injectable } from '@nestjs/common';
// import { CreateSalesHistoryDto } from './dto/create-sales-history.dto';
// import { UpdateSalesHistoryDto } from './dto/update-sales-history.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SalesHistoryService {
  
  constructor(private readonly databaseService: PrismaService) {}

  async create(createSalesHistoryDto: Prisma.HistoricalSalesCreateInput) {
    return this.databaseService.historicalSales.create({
      data: createSalesHistoryDto
    });
  }

  async createMany(createSalesHistoryDto: Prisma.HistoricalSalesCreateManyInput[]) {
    return this.databaseService.historicalSales.createMany({
      data: createSalesHistoryDto,
    });
  }

  async findAll() {
    return this.databaseService.historicalSales.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.historicalSales.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateSalesHistoryDto: Prisma.HistoricalSalesUpdateInput) {
    return this.databaseService.historicalSales.update({
      where: {
        id,
      },
      data: updateSalesHistoryDto
    })
  }

  async remove(id: number) {
    return this.databaseService.historicalSales.delete({
      where: {
        id
      }
    })
  }

  async findAllUniqueByProductId() {
    return this.databaseService.historicalSales.findMany({
      distinct: ['product_id'], 
    });
  }

  async estimateStockForNextMonth(productId: number, nextMonth: number) {
    const currentYear = new Date().getFullYear();
    const pastYears = [currentYear - 1, currentYear - 2, currentYear - 3];
    
    const salesData = await this.databaseService.historicalSales.findMany({
      where: {
        product_id: productId,
        month: nextMonth,
        year: { in: pastYears }
      }
    });
  
    // Calculate the average sales units for the past 3 years
    const totalSales = salesData.reduce((acc, record) => acc + record.sales_units, 0);
    const averageSales = totalSales / salesData.length;
    
    return Math.round(averageSales);
  }
}
