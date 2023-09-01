import { NextFunction, Request, Response } from 'express';
import OrderService from '@/services/order.service';
declare class orderController {
    OrderService: OrderService;
    private sequelize;
    getordersbycustid: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getordersbyorderid: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default orderController;
