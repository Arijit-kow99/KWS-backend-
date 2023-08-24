// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { OrderEvent } from '@interfaces/order_event.interface';

// Define the creation attributes for the OrderEvent
export type OrderEventCreationAttributes = Optional<OrderEvent, 'order_event_id' | 'created_on'>;

// Define the Sequelize model for the OrderEvent
export class OrderEventModel extends Model<OrderEvent, OrderEventCreationAttributes> implements OrderEvent {
  public order_event_id!: number;
  public order_id!: number;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;


}

// Define the initialization function for the OrderEvent model
export default function (sequelize: Sequelize): typeof OrderEventModel {
  OrderEventModel.init(
    {
      order_event_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      order_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      created_on: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      created_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'order_event', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return OrderEventModel;
}
