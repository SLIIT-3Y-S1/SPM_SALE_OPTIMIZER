import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SalesHistoryService } from './sales-history.service';
// import { CreateSalesHistoryDto } from './dto/create-sales-history.dto';
// import { UpdateSalesHistoryDto } from './dto/update-sales-history.dto';
import { Prisma } from '@prisma/client';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx'; 


@Controller('sales-history')
export class SalesHistoryController {
  constructor(private readonly salesHistoryService: SalesHistoryService) {}

  @Post()
  create(@Body() createSalesHistoryDto: Prisma.HistoricalSalesCreateInput) {
    return this.salesHistoryService.create(createSalesHistoryDto);
  }

  @Post('bulk')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Transform data to match Prisma.InventoryCreateManyInput
    const createSalesHistoryDto = data.map(item => ({
      // Map your Excel columns to Prisma.InventoryCreateManyInput fields
      product_id: item['id'],
      year: item['year'],
      month: item['month'],
      sales_units: item['sales_units']
    }));

    return this.salesHistoryService.createMany(createSalesHistoryDto);
  }
  
  @Post('bulk')
  createMany(@Body() createSalesHistoryDto: Prisma.HistoricalSalesCreateManyInput[]) {
    return this.salesHistoryService.createMany(createSalesHistoryDto);
  }

  @Get()
  findAll() {
    return this.salesHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesHistoryDto: Prisma.HistoricalSalesUpdateInput) {
    return this.salesHistoryService.update(+id, updateSalesHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesHistoryService.remove(+id);
  }

  @Get('estimated-stock/:nextMonth')
  async getEstimatedStock(@Param('nextMonth') nextMonth: string) {
    const products = await this.salesHistoryService.findAllUniqueByProductId();
    // console.log(products);
    
    const stockEstimates = await Promise.all(
      products.map(async (product) => {
        const estimate = await this.salesHistoryService.estimateStockForNextMonth(product.product_id, +nextMonth);
        return { product_id: product.product_id, estimated_stock: estimate };
      })
    );

    return stockEstimates;
  }

}
