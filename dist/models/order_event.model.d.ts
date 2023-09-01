import { Sequelize, Model, Optional } from 'sequelize';
import { OrderEvent } from '@interfaces/order_event.interface';
export declare type OrderEventCreationAttributes = Optional<OrderEvent, 'order_event_id' | 'created_on'>;
export declare class OrderEventModel extends Model<OrderEvent, OrderEventCreationAttributes> implements OrderEvent {
    order_event_id: number;
    order_id: number;
    status: number;
    created_on: Date;
    created_by: number;
}
export default function (sequelize: Sequelize): typeof OrderEventModel;
