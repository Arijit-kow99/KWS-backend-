import { compare, hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(500, 'Invalid User');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(500, 'Invalid User');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(500, 'Invalid User');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(500, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(500, 'Invalid User');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(500, 'Invalid User');

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(500, 'Invalid User');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(500, 'Invalid User');

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
  public async changepassword(res: any): Promise<User> {
    if (isEmpty(res)) throw new HttpException(500, 'Invalid User');
    const findUser: User = await this.users.findByPk(res.userid);
    if (!findUser) throw new HttpException(500, 'Invalid User');
    const isPasswordMatching: boolean = await compare(res.old_password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(500, 'Invalid Old Password');
    const hashedPassword = await hash(res.new_password, 10);
    await this.users.update({ ...findUser, password: hashedPassword }, { where: { id: findUser.id } });
    return findUser;
  }
}

export default UserService;
