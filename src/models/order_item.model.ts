import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { orderItems } from '@/interfaces/order_item.interface';



// Define the optional attributes (excluding the primary key)
export type OrderItemsCreationAttributes = Optional<orderItems, 'order_items_id'>;

// Create the OrderItems model
export class OrderItemsModel extends Model<orderItems, OrderItemsCreationAttributes>
  implements orderItems {
  public order_items_id!: number;
  public order_details_id!: number;
  public commodity_id!: number;
  public measurement_unit!: number ;
  public quantity!: number;
}

// Define the model's attributes and options
export default function (sequelize: Sequelize): typeof OrderItemsModel {
  OrderItemsModel.init(
    {
      order_items_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      order_details_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'order_details', 
          key: 'order_details_id', 
        },
        allowNull: false,
      },
      commodity_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'commodity', 
          key: 'commodity_id', 
        },
        allowNull: false,
      },
      measurement_unit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'order_items',
      sequelize,
    }
  );

  return OrderItemsModel;
}
