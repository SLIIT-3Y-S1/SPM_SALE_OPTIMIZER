import { Module } from '@nestjs/common';
import { SalesHistoryService } from './sales-history.service';
import { SalesHistoryController } from './sales-history.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SalesHistoryController],
  providers: [SalesHistoryService],
})
export class SalesHistoryModule {}
