import { Routes } from '@interfaces/routes.interface';
import orderController from '@/controllers/order.controller';
declare class OrderRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    orderController: orderController;
    constructor();
    private initializeRoutes;
}
export default OrderRoute;
