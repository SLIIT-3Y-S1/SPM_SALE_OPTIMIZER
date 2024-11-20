import { IsString, IsOptional, IsInt, IsUUID, IsNumber, IsDate, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsUUID()
  sale_id: string;

  @IsString()
  order_id: string;

  @IsString()
  product_id: string;

  @IsOptional()   // Optional field
  @IsString()
  variant_id?: string;

  @IsInt()
  @IsPositive()
  quantity_sold: number;

  @IsNumber()
  @IsPositive()
  total_price: number;

  @IsDate()
  @Type(() => Date)  // Transform string to Date
  created_at: Date;

  @IsDate()
  @Type(() => Date)  // Transform string to Date
  updated_at: Date;
}
