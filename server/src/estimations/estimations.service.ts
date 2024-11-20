import { Injectable } from '@nestjs/common';
// import { CreateEstimationDto } from './dto/create-estimation.dto';
// import { UpdateEstimationDto } from './dto/update-estimation.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import axios from 'axios';
import { Parser } from 'json2csv';

@Injectable()
export class EstimationsService {

  constructor(private readonly databaseService: PrismaService) {}

  async create(createEstimationDto: Prisma.EstimationsCreateInput) {
    return this.databaseService.estimations.create({
      data: createEstimationDto
    });
  }

  async findAll() {
    return this.databaseService.estimations.findMany()
  }

  // async findOne(id: number) {
  //   return this.databaseService.estimations.findUnique({
  //     where: {
  //       id: id
  //     }
  //   })
  // }

  async update(id: number, updateEstimationDto: Prisma.EstimationsUpdateInput) {
    return this.databaseService.estimations.update({
      where: {
        id,
      },
      data: updateEstimationDto
    })
  }

  async updateByProductId(product_id: number, updateEstimationDto: Prisma.EstimationsUpdateInput) {
    return this.databaseService.estimations.updateMany({
      where: {
        product_id,
      },
      data: updateEstimationDto
    });
  }

  async remove(id: number) {
    return this.databaseService.estimations.delete({
      where: {
        id
      }
    })
  }

  async fetchAndSaveEstimations(nextMonth: number): Promise<void> {
    const url = `http://localhost:5500/api/v1/sales-history/estimated-stock/${nextMonth}`;
    const response = await axios.get(url);
    const estimations = response.data;

    for (const estimation of estimations) {
      const existingEstimation = await this.databaseService.estimations.findFirst({
        where: {
          product_id: estimation.product_id,
          year: new Date().getFullYear(),
          month: nextMonth,
        },
      });

      if (existingEstimation) {
        await this.updateByProductId(estimation.product_id, {
          estimate: estimation.estimated_stock,
        });
      } else {
        await this.databaseService.estimations.create({
          data: {
            product_id: estimation.product_id,
            estimate: estimation.estimated_stock,
            year: new Date().getFullYear(),
            month: nextMonth,
          },
        });
      }
    }
  }

  async generateReport(): Promise<Buffer> {
    console.log('Generating CSV report');
    const estimations = await this.findAll();

    // Check if inventories were retrieved
    if (!estimations || estimations.length === 0) {
      throw new Error('No inventory data found'); // Handle case where no data is found
    }

    // Define the CSV fields (column headers)
    const fields = ['product_id', 'estimate', 'year', 'month'];

    // Map inventories to CSV-friendly data format
    const csvParser = new Parser({ fields });
    const csv = csvParser.parse(estimations);

    // Return CSV as buffer
    return Buffer.from(csv);
  }

}
