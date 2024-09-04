import { Module } from '@nestjs/common';
import { CustomerSegmentService } from './customer-segment.service';
import { CustomerSegmentController } from './customer-segment.controller';

@Module({
  controllers: [CustomerSegmentController],
  providers: [CustomerSegmentService],
})
export class CustomerSegmentModule {}
