import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialFunctionService } from './special-function.service';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';

@Controller('special-function')
export class SpecialFunctionController {
  constructor(private readonly spfService: SpecialFunctionService) {}

  @Get('daily-dates')
  async getOrderDates() {
    return this.spfService.getOrderDates();
  }
  @Get('monthly-dates')
  async getOrderMonths() {
    return this.spfService.getOrderMonths();
  }
}
