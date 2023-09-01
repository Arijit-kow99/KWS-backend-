import { OrderModel } from '@/models/order.model';
import { OrderInput } from '@/interfaces/order.interface';
declare class OrderService {
    private sequelize;
    order: typeof OrderModel;
    order_detail: typeof import("../models/order_detail.model").OrderDetailModel;
    order_item: typeof import("../models/order_event.model").OrderEventModel;
    order_event: typeof import("../models/order_item.model").OrderItemsModel;
    findAllOrderbycustomer(customerId: number): Promise<any>;
    findAllOrderbyorderid(orderid: number): Promise<any>;
    createOrder(orderInput: OrderInput, transaction: any): Promise<any>;
}
export default OrderService;
