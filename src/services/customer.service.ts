import { SECRET_KEY } from '@/config';
import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { Cutomer, DataStoredInToken, TokenData } from '@/interfaces/customer.interfcae';
import { isEmpty } from '@/utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class CustomerService {
  public customer = DB.Customers;

  public async signup(userData: any): Promise<String> {
    if (isEmpty(userData)) throw new HttpException(400, 'Invalid user Data');
    const findUser: Cutomer = await this.customer.findOne({ where: { customer_phone: userData.customer_phone } });
    if (findUser) throw new HttpException(500, `Your email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.customer_password, 10);
    const createUserData: Cutomer = await this.customer.create({ ...userData, customer_password: hashedPassword, reset_flag: 1, status: 1 });
    return `Your ${createUserData.customer_phone} is successfully Registerd`;
  }

  public async login(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(500, 'Invalid Credentials');

    const findUser: Cutomer = await this.customer.findOne({ where: { customer_phone: userData.customer_phone } });
    if (!findUser) throw new HttpException(500, `Invalid Credentials`);

    const isPasswordMatching: boolean = await compare(userData.customer_password, findUser.customer_password);
    if (!isPasswordMatching) throw new HttpException(500, 'Invalid Credentials');
    delete findUser.customer_password;
    const tokenData = this.createToken(findUser);
    return { ...findUser, token: tokenData };
  }
  public createToken(user: Cutomer): string {
    const dataStoredInToken: DataStoredInToken = { id: user.customer_id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 120;

    return sign(dataStoredInToken, secretKey);
  }
}
export default CustomerService;
