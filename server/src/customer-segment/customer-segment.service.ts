import { Injectable } from '@nestjs/common';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';

@Injectable()
export class CustomerSegmentService {
  create(createCustomerSegmentDto: CreateCustomerSegmentDto) {
    return 'This action adds a new customerSegment';
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
