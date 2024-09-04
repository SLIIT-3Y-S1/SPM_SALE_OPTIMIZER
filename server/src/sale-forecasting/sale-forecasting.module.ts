import { Module } from '@nestjs/common';
import { SaleForecastingService } from './sale-forecasting.service';
import { SaleForecastingController } from './sale-forecasting.controller';

@Module({
  controllers: [SaleForecastingController],
  providers: [SaleForecastingService],
})
export class SaleForecastingModule {}
