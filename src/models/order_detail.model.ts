// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { OrderDetail } from '@interfaces/order_detail.interface';

// Define the creation attributes for the OrderDetail
export type OrderDetailCreationAttributes = Optional<OrderDetail, 'order_details_id'>;

// Define the Sequelize model for the OrderDetail
export class OrderDetailModel extends Model<OrderDetail, OrderDetailCreationAttributes> implements OrderDetail {
  public order_details_id!: number;
  public product_id!: number;
  public product_type!: number;
  public order_id!: number;
  public quantity!: number;
  public unit_price!: number;
  public sub_total_price!: number;

 
}

// Define the initialization function for the OrderDetail model
export default function (sequelize: Sequelize): typeof OrderDetailModel {
  OrderDetailModel.init(
    {
      order_details_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      product_type: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      order_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      unit_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      sub_total_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'order_details', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return OrderDetailModel;
}
