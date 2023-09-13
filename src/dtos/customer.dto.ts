import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {

  @IsString()

  public customer_name?: string;

  @IsEmail()
  @IsOptional()
  public customer_email?: string;

  @IsPhoneNumber('IN')
  @IsOptional()
  public customer_phone?: string;
}
