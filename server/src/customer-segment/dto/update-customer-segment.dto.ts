import { IsString,IsEmail } from 'class-validator';

export class UpdateCustomerSegmentDto{

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;
}
