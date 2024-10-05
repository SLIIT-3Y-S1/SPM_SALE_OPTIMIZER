import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { CreateInventoryDto } from './dto/create-inventory.dto';
// import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Prisma } from '@prisma/client';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx'; 
import { Response } from 'express';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: Prisma.InventoryCreateInput) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll(@Query('category') category?: 'Clothing' | 'Footwear' | 'Accessories') {
    return this.inventoryService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: Prisma.InventoryUpdateInput) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }

  @Post('bulk')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Transform data to match Prisma.InventoryCreateManyInput
    const createInventoryDto = data.map(item => ({
      // Map your Excel columns to Prisma.InventoryCreateManyInput fields
      product_name: item['name'],
      category: item['category'],
      stock_level: item['stock'],
      reorder_level: item['reorder'],
      price: item['price'],
    }));

    return this.inventoryService.createMany(createInventoryDto);
  }
  
  @Post('bulk')
  createMany(@Body() createInventoryDto: Prisma.InventoryCreateManyInput[]) {
    return this.inventoryService.createMany(createInventoryDto);
  }
  
  @Get('report')
  async getReport(@Res() res: Response) {
    try {
      const fileBuffer = await this.inventoryService.generateReport();

      // Set response headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.csv');
      res.setHeader('Content-Type', 'text/csv');

      // Send the CSV file buffer as the response
      res.send(fileBuffer);
    } catch (error) {
      console.error('Error generating report:', error); // Log detailed error
      res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

}

