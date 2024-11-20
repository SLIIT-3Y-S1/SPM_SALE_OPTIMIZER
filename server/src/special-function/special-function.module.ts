import { Module } from '@nestjs/common';
import { SpecialFunctionService } from './special-function.service';
import { SpecialFunctionController } from './special-function.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SpecialFunctionController],
  providers: [SpecialFunctionService],
})
export class SpecialFunctionModule {}
