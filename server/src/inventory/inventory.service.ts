import { Injectable } from '@nestjs/common';
// import { CreateInventoryDto } from './dto/create-inventory.dto';
// import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

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
    return this.databaseService.inventory.findUnique({
      where: {
        id
      }
    })
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
}
