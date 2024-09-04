import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleForecastingService } from './sale-forecasting.service';
import { CreateSaleForecastingDto } from './dto/create-sale-forecasting.dto';
import { UpdateSaleForecastingDto } from './dto/update-sale-forecasting.dto';

@Controller('sale-forecasting')
export class SaleForecastingController {
  constructor(private readonly saleForecastingService: SaleForecastingService) {}

  @Post()
  create(@Body() createSaleForecastingDto: CreateSaleForecastingDto) {
    return this.saleForecastingService.create(createSaleForecastingDto);
  }

  @Get()
  findAll() {
    return this.saleForecastingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleForecastingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleForecastingDto: UpdateSaleForecastingDto) {
    return this.saleForecastingService.update(+id, updateSaleForecastingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleForecastingService.remove(+id);
  }
}
