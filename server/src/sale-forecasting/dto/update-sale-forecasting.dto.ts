import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleForecastingDto } from './create-sale-forecasting.dto';

export class UpdateSaleForecastingDto extends PartialType(CreateSaleForecastingDto) {}
