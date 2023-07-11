import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public userType: string;

  @IsString()
  public roleType: string;

  @IsString()
  public userName: string;

  @IsString()
  public contact: string;
}
