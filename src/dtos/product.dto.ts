import { IsString, IsInt, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public product_name: string;

  @IsString()
  public product_desc: string;

  @IsOptional()
  @IsInt()
  public image_id: number;

  @IsInt()
  public max_allowed_items: number;

  @IsNumber()
  public status: number;

  @IsString()
  public created_on: string;

  @IsInt()
  public created_by: number;

  @IsString()
  public updated_on:string ;

  @IsInt()
  public updated_by: number;

  @IsString()
  public product_code: string;
}
