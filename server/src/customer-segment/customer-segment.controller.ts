import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerSegmentService } from './customer-segment.service';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';
import { responseFormat } from 'src/common/types';

@Controller('customer-segment')
export class CustomerSegmentController {
  constructor(private readonly customerSegmentService: CustomerSegmentService) {}


  // Get orders categorized by value ranges
  @Get('ordervalue')
  async getOrderValueRanges() {
  return await this.customerSegmentService.getOrderCountByValueRanges();
}
@Get('purchase-frequency')
  async getPurchaseFrequency() {
    try {
      const frequencyData = await this.customerSegmentService.getPurchaseFrequency();
      return { data: frequencyData }; // Return the data directly
    } catch (error) {
      console.error('Error in purchase frequency endpoint:', error);
      return { message: 'Error fetching purchase frequency', error }; // Return error directly
    }
  }

  @Get('orders-by-province')
  async getOrderCountByProvince() {
    return this.customerSegmentService.countOrdersByProvince();
  }

  @Get('orders-by-status')
  async getOrderCountsByStatus() {
    return this.customerSegmentService.countOrdersByStatus();
  }


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
    return this.customerSegmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerSegmentDto: UpdateCustomerSegmentDto) {
    return this.customerSegmentService.update(id, updateCustomerSegmentDto);
  }

  @Delete(':id')//delete specific
  remove(@Param('id') id: string) {
    return this.customerSegmentService.remove(id);
  }

  @Delete()//delete all at one 
  async deleteAll(): Promise<responseFormat> {
    return await this.customerSegmentService.deleteAll();
  }
  
}
