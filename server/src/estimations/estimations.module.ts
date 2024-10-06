import { Module } from '@nestjs/common';
import { EstimationsService } from './estimations.service';
import { EstimationsController } from './estimations.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EstimationsController],
  providers: [EstimationsService],
})
export class EstimationsModule {}
