import { IsInt, IsString } from 'class-validator';

export class CreateFCMDto {
  @IsInt()
  public customer_id: number;

  @IsString()
  public fcm_token: string;
}
