import { IsString, IsUUID, IsEmail, IsDate, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerSegmentDto {
    /*
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;

    */ 
    @IsUUID()
    customer_id: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;

    @IsDate()
    @Type(() => Date)  // Transform string to Date
    created_at: Date;

    @IsDate()
    @Type(() => Date)  // Transform string to Date
    updated_at: Date;

}
