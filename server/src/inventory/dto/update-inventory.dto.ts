
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateInventoryDto  {
  @IsOptional()
  @IsNotEmpty()
  product_name?: string;

  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsNumber()
  stock_level?: number;

  @IsOptional()
  @IsNumber()
  reorder_level?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}


