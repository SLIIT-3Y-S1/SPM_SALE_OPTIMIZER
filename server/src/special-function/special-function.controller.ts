import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialFunctionService } from './special-function.service';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';

@Controller('special-function')
export class SpecialFunctionController {
  constructor(private readonly specialFunctionService: SpecialFunctionService) {}

  @Post()
  create(@Body() createSpecialFunctionDto: CreateSpecialFunctionDto) {
    return this.specialFunctionService.create(createSpecialFunctionDto);
  }

  @Get()
  findAll() {
    return this.specialFunctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialFunctionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialFunctionDto: UpdateSpecialFunctionDto) {
    return this.specialFunctionService.update(+id, updateSpecialFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialFunctionService.remove(+id);
  }
}
