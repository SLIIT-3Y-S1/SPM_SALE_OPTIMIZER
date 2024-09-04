import { Module } from '@nestjs/common';
import { SpecialFunctionService } from './special-function.service';
import { SpecialFunctionController } from './special-function.controller';

@Module({
  controllers: [SpecialFunctionController],
  providers: [SpecialFunctionService],
})
export class SpecialFunctionModule {}
