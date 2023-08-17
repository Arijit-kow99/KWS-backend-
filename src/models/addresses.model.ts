import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Address } from '@interfaces/addresses.interface'; 

export type AddressAttributes = Optional<Address, 'address_id' | 'status'>;

export class AddressModel extends Model<Address, AddressAttributes> implements Address {
 
  public address_id: number;
  public house_no: string;
  public address_line1: string;
  public address_line2: string;
  // public flat_no: string;
  // public block_no: string;
  // public society: string;
  public city: string;
  public state: string;
  public country: string;
  public pin: string;
  public status: number;
  public customer_id: number; 

  public  createdAt!: Date;
  public  updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AddressModel {
  AddressModel.init(
    {
      address_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      house_no: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      address_line1: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      address_line2: {
        type: DataTypes.STRING(255),
      },
      // flat_no: {
      //   type: DataTypes.STRING(255),
      // },
      // block_no: {
      //   type: DataTypes.STRING(255),
      // },
      // society: {
      //   type: DataTypes.STRING(255),
      // },
      
      city: {
        allowNull: false,
        type: DataTypes.STRING(60),
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      pin: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      status: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      customer_id: {
        type: DataTypes.BIGINT, 
        references: {
          model: 'Customer', 
          key: 'customer_id', 
        },
      },
    },
    {
      tableName: 'address',
      sequelize,
    },
  );

  return AddressModel;
}
