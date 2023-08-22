
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Order } from '@interfaces/order.interface';


export type OrderCreationAttributes = Optional<Order, 'order_id' | 'created_on' | 'updated_on'>;

export class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
  public order_id!: number;
  public order_code!: string;
  public payment_status!: number;
  public payment_mode!: number;
  public txn_ref_no!: string;
  public payment_date!: Date;
  public customer_id!: number;
  public address_id!: number;
  public expected_delivery_date!: Date;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
  public total_price!: number;


}


export default function (sequelize: Sequelize): typeof OrderModel {
  OrderModel.init(
    {
      order_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      order_code: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      payment_status: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      payment_mode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      txn_ref_no: {
        type: DataTypes.STRING(255),
      },
      payment_date: {
        type: DataTypes.DATE,
      },
      customer_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      address_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      expected_delivery_date: {
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      updated_on: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      total_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'order', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return OrderModel;
}
