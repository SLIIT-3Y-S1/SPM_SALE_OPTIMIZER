import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerSegmentService } from './customer-segment.service';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';

@Controller('customer-segment')
export class CustomerSegmentController {
  constructor(private readonly customerSegmentService: CustomerSegmentService) {}

  @Post()
  create(@Body() createCustomerSegmentDto: CreateCustomerSegmentDto) {
    return this.customerSegmentService.create(createCustomerSegmentDto);
  }

  @Get()
  findAll() {
    return this.customerSegmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerSegmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerSegmentDto: UpdateCustomerSegmentDto) {
    return this.customerSegmentService.update(+id, updateCustomerSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerSegmentService.remove(+id);
  }
}
