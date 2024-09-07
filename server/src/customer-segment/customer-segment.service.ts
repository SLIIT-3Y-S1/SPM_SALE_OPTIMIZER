import { Injectable } from '@nestjs/common';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CustomerSegmentService {
  constructor(private readonly prismaService:PrismaService) {}

  create(createCustomerSegmentDto: CreateCustomerSegmentDto) {
    return `This action returns all customerSegment000`;
  }

  findAll() {
    return `This action returns all customerSegment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerSegment`;
  }

  update(id: number, updateCustomerSegmentDto: UpdateCustomerSegmentDto) {
    return `This action updates a #${id} customerSegment`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerSegment`;
  }
}
