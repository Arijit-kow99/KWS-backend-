import { Sequelize, Model, Optional } from 'sequelize';
import { Order } from '@interfaces/order.interface';
export declare type OrderCreationAttributes = Optional<Order, 'order_id' | 'created_on' | 'updated_on'>;
export declare class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
    order_id: number;
    order_code: string;
    payment_status: number;
    payment_mode: number;
    txn_ref_no: string;
    payment_date: Date;
    customer_id: number;
    address_id: number;
    expected_delivery_date: Date;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    total_price: number;
}
export default function (sequelize: Sequelize): typeof OrderModel;
