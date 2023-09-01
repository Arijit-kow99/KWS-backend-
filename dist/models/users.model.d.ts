import { Sequelize, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
export declare type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;
export declare class UserModel extends Model<User, UserCreationAttributes> implements User {
    id: number;
    email: string;
    password: string;
    userType: string;
    roleType: string;
    userName: string;
    contact: string;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof UserModel;
