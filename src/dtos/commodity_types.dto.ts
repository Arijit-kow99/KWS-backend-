import { IsString, IsInt } from 'class-validator';

export class CreateCommodityTypeDto {
  @IsString()
  public commodity_type_name: string;

  @IsInt()
  public status: number;

  @IsString()
  public created_on?: string;

  @IsInt()
  public created_by?: number;

  @IsString()
  public updated_on?: string;

  @IsInt()
  public updated_by?: number;
}
