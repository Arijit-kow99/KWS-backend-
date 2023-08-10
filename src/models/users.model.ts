import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public password: string;
  public userType: string;
  public roleType: string;
  public userName: string;
  public contact: string;

  public  createdAt!: Date;
  public  updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'userid',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      userType: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      roleType: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      contact: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
