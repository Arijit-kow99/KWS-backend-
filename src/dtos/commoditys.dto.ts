import { IsString, IsEmail, IsInt, IsDate } from 'class-validator';

export class CreateCommodityDto {
  @IsString()
  public commodity_name: string;

  @IsInt()
  public commodity_type_id: number;
  
  @IsInt()
  public image_id: number;

  @IsInt()
  public status: number;

  @IsDate()
  public created_on: Date;

  @IsInt()
  public created_by: number;

  @IsDate()
  public updated_on: Date;

  @IsInt()
  public updated_by: number;

  @IsString()
  public commodity_code: string;
}
