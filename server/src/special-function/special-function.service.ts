import { Injectable } from '@nestjs/common';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class SpecialFunctionService {

  constructor(private readonly prisma: PrismaService) {}

  async getOrderDates() {
    const dates = await this.prisma.order.findMany({
      select: {
        created_at: true,
      },
      distinct: ['created_at'],  // Fetch distinct created_at dates
    });

    // Return only the date part as a string in 'YYYY-MM-DD' format
    return dates.map(dateObj => dateObj.created_at.toISOString().split('T')[0]);
  }
}
