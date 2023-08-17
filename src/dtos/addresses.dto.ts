
import { IsString, IsInt,  IsBoolean } from 'class-validator';

export class CreateAddressDto {
  
  @IsString()
  public house_no: string;

 
  @IsString()
  public address_line1: string;


  @IsString()
  public address_line2: string;

  // @IsString()
  // public flat_no: string;

  // @IsString()
  // public block_no: string;

  // @IsString()
  // public society: string;


  // @IsString()
  public city: string;

 
  @IsString()
  public state: string;

 
  @IsString()
  public country: string;

 
  @IsString()
  public pin: string;

  
  @IsBoolean()
  public status: boolean;

  @IsInt()
  public customer_id: number;
}