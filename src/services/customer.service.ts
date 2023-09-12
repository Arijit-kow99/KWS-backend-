import { SECRET_KEY } from '@/config';
import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { Customer, DataStoredInToken, TokenData } from '@/interfaces/customer.interfcae';
import { isEmpty } from '@/utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { clearConfigCache } from 'prettier';
import { isColString } from 'sequelize/types/utils';


class CustomerService {
  public customer = DB.Customers;

  public async signup(userData: any): Promise<String> {
    if (isEmpty(userData)) throw new HttpException(400, 'Invalid user Data');
    //console.log("log......",userData)
    const findUser: Customer = await this.customer.findOne({ where: { customer_phone: userData.data.customer_phone } });
    if (findUser) throw new HttpException(501, `Your phoneno ${userData.data.customer_phone} already exists`);
    const hashedPassword = await hash(userData.data.customer_password, 10);
    const createUserData: Customer = await this.customer.create({ ...userData.data, customer_password: hashedPassword, reset_flag: 1, status: 1 });
    return `Your ${createUserData.customer_phone} is successfully Registerd`;
  }

  public async login(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(500, 'Invalid Credentials');

    const findUser: Customer = await this.customer.findOne({ where: { customer_phone: userData.customer_phone } });
    if (!findUser) throw new HttpException(500, `Invalid Credentials`);

    const isPasswordMatching: boolean = await compare(userData.customer_password, findUser.customer_password);
    if (!isPasswordMatching) throw new HttpException(500, 'Invalid Credentials');
    delete findUser.customer_password;
    const tokenData = this.createToken(findUser);
    return { ...findUser, token: tokenData };
  }
  public createToken(user: Customer): string {
    const dataStoredInToken: DataStoredInToken = { id: user.customer_id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 120;

    return sign(dataStoredInToken, secretKey);
  }
  public async changepassword(res: any ): Promise<any>{
   
    if(isEmpty(res)) throw new HttpException(500,'Invalid Customer');
    const customerId=res.customer_id;
    if (!customerId) throw new HttpException(500, 'Invalid Customer');
    const findcustomer: any =await this.customer.findByPk(customerId);
    if (!findcustomer) throw new HttpException(500,'Invalid Customer');
    const isPasswordMatching : boolean = await compare(res.old_password , findcustomer.customer_password);
 
    if (!isPasswordMatching) throw new HttpException(500,'Old Password entered is invalid');
    
    const hashedPassword = await hash(res.new_password, 10);
    await this.customer.update({ customer_password: hashedPassword }, { where: { customer_id: customerId } });
    return findcustomer;
  };
  public async findAllCustomer(): Promise<Customer[]> {
    const allCustomer: Customer[] =await this.customer.findAll();
    return allCustomer;
  }

  public async updateCustomer(customerId: number, customerData: any): Promise<Customer> {
    if (isEmpty(customerData)) throw new HttpException(500, 'Invalid Customer Data');

    const findCustomer: Customer = await this.customer.findByPk(customerId);
    if (!findCustomer) throw new HttpException(500, 'Customer not found');

    await this.customer.update(customerData, { where: { customer_id: customerId } });

    const updatedCustomer: Customer = await this.customer.findByPk(customerId);
    return updatedCustomer;
  }


  

}
export default CustomerService;