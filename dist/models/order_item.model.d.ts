import { Sequelize, Model, Optional } from 'sequelize';
import { orderItems } from '@/interfaces/order_item.interface';
export declare type OrderItemsCreationAttributes = Optional<orderItems, 'order_items_id'>;
export declare class OrderItemsModel extends Model<orderItems, OrderItemsCreationAttributes> implements orderItems {
    order_items_id: number;
    order_details_id: number;
    commodity_id: number;
    measurement_unit: number;
    quantity: number;
}
export default function (sequelize: Sequelize): typeof OrderItemsModel;
