import { Injectable } from '@nestjs/common';
// import { CreateInventoryDto } from './dto/create-inventory.dto';
// import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as xlsx from 'xlsx'; 
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { log } from 'console';
import { Parser } from 'json2csv';

@Injectable()
export class InventoryService {

  constructor(private readonly databaseService: PrismaService) {}

  async create(createInventoryDto: Prisma.InventoryCreateInput) {
    return this.databaseService.inventory.create({
      data: createInventoryDto
    });
  }

  async findAll(category?: 'Clothing' | 'Footwear' | 'Accessories') {
    if (category) return this.databaseService.inventory.findMany({
      where: {
        category, 
      }
    })
    return this.databaseService.inventory.findMany()
  }
  
  async findOne(id: number) {
    return this.databaseService.inventory.findFirst({
      where: { id },
    });
  }

  async update(id: number, updateInventoryDto: Prisma.InventoryUpdateInput) {
    return this.databaseService.inventory.update({
      where: {
        id,
      },
      data: updateInventoryDto
    })
  }

  async remove(id: number) {
    return this.databaseService.inventory.delete({
      where: {
        id
      }
    })
  }

  async createMany(createInventoryDto: Prisma.InventoryCreateManyInput[]) {
    return this.databaseService.inventory.createMany({
      data: createInventoryDto,
    });
  }

  async generateReport(): Promise<Buffer> {
    console.log('Generating CSV report');
    const inventories = await this.findAll(); // Retrieves all inventory items

    // Check if inventories were retrieved
    if (!inventories || inventories.length === 0) {
      throw new Error('No inventory data found'); // Handle case where no data is found
    }

    // Define the CSV fields (column headers)
    const fields = ['id', 'product_name', 'category', 'stock_level', 'reorder_level', 'price'];

    // Map inventories to CSV-friendly data format
    const csvParser = new Parser({ fields });
    const csv = csvParser.parse(inventories);

    // Return CSV as buffer
    return Buffer.from(csv);
  }

  async search(searchTerm: string) {
    return this.databaseService.inventory.findMany({
      where: {
        OR: [
          {
            product_name: {
              contains: searchTerm,
            },
          },
          {
            category: {
              contains: searchTerm,
            },
          },
        ],
      },
    });
  }
}
