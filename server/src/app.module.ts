import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';

import { CustomerSegmentModule } from './customer-segment/customer-segment.module';
import { InventoryModule } from './inventory/inventory.module';
import { SaleForecastingModule } from './sale-forecasting/sale-forecasting.module';
import { SpecialFunctionModule } from './special-function/special-function.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, AuthModule, CommonModule, ConfigModule, DatabaseModule, CustomerSegmentModule, InventoryModule, SaleForecastingModule, SpecialFunctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
