import { Injectable } from '@nestjs/common';
import { CreateSaleForecastingDto } from './dto/create-sale-forecasting.dto';
import { UpdateSaleForecastingDto } from './dto/update-sale-forecasting.dto';

@Injectable()
export class SaleForecastingService {
  create(createSaleForecastingDto: CreateSaleForecastingDto) {
    return 'This action adds a new saleForecasting';
  }

  findAll() {
    return `This action returns all saleForecasting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleForecasting`;
  }

  update(id: number, updateSaleForecastingDto: UpdateSaleForecastingDto) {
    return `This action updates a #${id} saleForecasting`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleForecasting`;
  }
}
