import { CreateUserDto } from '@dtos/users.dto';
import { LoginUserDto } from '@dtos/login.dto';
import { LoginResponseDto } from '@dtos/loginResponse.dto';
import { TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
declare class AuthService {
    users: typeof import("../models/users.model").UserModel;
    signup(userData: CreateUserDto): Promise<String>;
    login(userData: LoginUserDto): Promise<{
        resp: LoginResponseDto;
    }>;
    logout(userData: User): Promise<User>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default AuthService;
