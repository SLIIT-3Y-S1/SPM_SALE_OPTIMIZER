import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SaleForecastingService } from './sale-forecasting.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateSaleDto } from './dto';
import { responseFormat } from 'src/common/types';

@Controller('sale')
export class SaleForecastingController {
  constructor(
    private readonly saleForecastingService: SaleForecastingService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSaleDto:CreateSaleDto ) {
    return this.saleForecastingService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.saleForecastingService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.saleForecastingService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ):Promise<responseFormat> {
    return this.saleForecastingService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string):Promise<responseFormat> {
    return this.saleForecastingService.remove(id);
  }
}
