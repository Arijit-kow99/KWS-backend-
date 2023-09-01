import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateImageDto {


  @IsInt()
  public image_type: number;

 
  public image_data: Buffer;


}
