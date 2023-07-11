import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public userid: string;

  @IsString()
  public password: string;

}
