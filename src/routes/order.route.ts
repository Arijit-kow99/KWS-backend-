import { Router } from 'express';
import CommodityController from '@controllers/commoditys.controller';
import { CreateCommodityDto } from '@dtos/commoditys.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import orderController from '@/controllers/order.controller';
// import authMiddleware from '@middlewares/auth.middleware';

class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  public orderController = new orderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/cust/:customer_id`,this.orderController.getordersbycustid);    
    this.router.get(`${this.path}/:order_id`,this.orderController.getordersbyorderid);  
    this.router.post(`${this.path}/CreateOrder`,this.orderController.createOrder);  
    // this.router.post(`${this.path}/Calculateorderprice`,this.orderController.calculateOrderprice);  
  }
}
export default OrderRoute;
