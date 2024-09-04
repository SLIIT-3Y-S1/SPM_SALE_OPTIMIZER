import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialFunctionDto } from './create-special-function.dto';

export class UpdateSpecialFunctionDto extends PartialType(CreateSpecialFunctionDto) {}
