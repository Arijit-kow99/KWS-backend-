import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { LoginUserDto } from '@dtos/login.dto';
import { LoginResponseDto } from '@dtos/loginResponse.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<String> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid user Data");

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return `Your ${createUserData.email} is successfully Registerd`;
  }

  public async login(userData: LoginUserDto): Promise<{resp: LoginResponseDto }> {
    if (isEmpty(userData)) throw new HttpException(500, "Invalid Credentials");

    const findUser: User = await this.users.findOne({ where: { userName: userData.userid } });
    if (!findUser) throw new HttpException(500, `Invalid Credentials`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(500, "Invalid Credentials");

    const tokenData = this.createToken(findUser);
    // const cookie = this.createCookie(tokenData);
    const resp: LoginResponseDto = new LoginResponseDto(findUser.email,findUser.id,findUser.roleType,findUser.userType,tokenData.token, findUser.userName, findUser.contact);

    return { resp };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not user");

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not a user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 120;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
