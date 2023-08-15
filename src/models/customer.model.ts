import { Cutomer } from '@/interfaces/customer.interfcae';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type CustomerCreationAttributes = Optional<Cutomer, 'customer_id'>;

export class CutomerModel extends Model<Cutomer, CustomerCreationAttributes> implements Cutomer {
  public customer_id: number;
  public customer_name: string;
  public customer_email: string;
  public customer_password: string;
  public customer_phone: string;
  public status: number;
  public reset_flag: number;
}

export default function (sequelize: Sequelize): typeof CutomerModel {
  CutomerModel.init(
    {
      customer_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customer_email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      customer_password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      customer_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      customer_phone: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      reset_flag: {
        allowNull: true,
        type: DataTypes.STRING(100),
        defaultValue: 1,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING(100),
        defaultValue: 1,
      },
    },
    {
      tableName: 'customer',
      sequelize,
    },
  );

  return CutomerModel;
}
