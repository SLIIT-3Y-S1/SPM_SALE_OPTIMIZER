import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { SaleForecastingService } from './sale-forecasting.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateSaleDto } from './dto';
import { responseFormat } from 'src/common/types';
import { Response } from 'express';
@Controller('sale')
export class SaleForecastingController {
  constructor(
    private readonly saleForecastingService: SaleForecastingService,
  ) {}

  // generate report
  @Get('generate-report')
async generateReport(@Res() res: Response) {
  const report = await this.saleForecastingService.generateReport();
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="sales-report.pdf"',
  });
  res.end(report.data); // Send the PDF buffer to the client
}

@Get('search-by-orderID/:order_id')
  // @UseGuards(JwtAuthGuard)
  searchByOrderID(@Param('order_id') order_id: string) {
    return this.saleForecastingService.searchByOrderID(order_id);
  }
  

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleForecastingService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.saleForecastingService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.saleForecastingService.findOne(id);
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<responseFormat> {
    return this.saleForecastingService.update(id, updateSaleDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<responseFormat> {
    return this.saleForecastingService.remove(id);
  }

  

}
