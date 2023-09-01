import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
declare class UserService {
    users: typeof import("../models/users.model").UserModel;
    findAllUser(): Promise<User[]>;
    findUserById(userId: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(userId: number, userData: CreateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<User>;
    changepassword(res: any): Promise<User>;
}
export default UserService;
