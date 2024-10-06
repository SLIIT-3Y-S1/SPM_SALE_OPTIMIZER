import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

import { CustomerSegmentModule } from './customer-segment/customer-segment.module';
import { InventoryModule } from './inventory/inventory.module';
import { SaleForecastingModule } from './sale-forecasting/sale-forecasting.module';
import { SpecialFunctionModule } from './special-function/special-function.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SalesHistoryModule } from './sales-history/sales-history.module';
import { EstimationsModule } from './estimations/estimations.module';



@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    AuthModule, CommonModule, DatabaseModule, CustomerSegmentModule, InventoryModule, SaleForecastingModule, SpecialFunctionModule, SalesHistoryModule, EstimationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
