import { IsNotEmpty } from "class-validator";


export class UpdateSaleDto {

    @IsNotEmpty()
    readonly quantity_sold: number;

    @IsNotEmpty()
    readonly total_price: number;
}
