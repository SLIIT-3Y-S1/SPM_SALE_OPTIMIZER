import { IsNotEmpty } from "class-validator";


export class UpdateSaleDto {

    @IsNotEmpty()
    readonly quantity: number;

    @IsNotEmpty()
    readonly total_price: number;
}
