import { IsString, IsUUID, IsEmail, IsDate, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerSegmentDto {
    /*
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    dob :Date;
    created_at: Date;
    updated_at: Date;

    */ 

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;

    @IsString()
    dob: string; //date of birth

    @IsDate()
    @Type(() => Date)  // Transform string to Date
    created_at: Date;

    @IsDate()
    @Type(() => Date)  // Transform string to Date
    updated_at: Date;

}
