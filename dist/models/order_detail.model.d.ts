import { Sequelize, Model, Optional } from 'sequelize';
import { OrderDetail } from '@interfaces/order_detail.interface';
export declare type OrderDetailCreationAttributes = Optional<OrderDetail, 'order_details_id'>;
export declare class OrderDetailModel extends Model<OrderDetail, OrderDetailCreationAttributes> implements OrderDetail {
    order_details_id: number;
    product_id: number;
    product_type: number;
    order_id: number;
    quantity: number;
    unit_price: number;
    sub_total_price: number;
}
export default function (sequelize: Sequelize): typeof OrderDetailModel;
