import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: 'src/config/.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class ConfigModule {}
