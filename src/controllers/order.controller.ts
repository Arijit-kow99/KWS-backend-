import {NextFunction , Request , Response} from 'express';
import { CreateCommodityDto } from '@/dtos/commoditys.dto';
import {  } from '@/interfaces/commodity.interface';
import CommodityService from '@/services/commoditys.service';
import { Order } from 'sequelize';
import OrderService from '@/services/order.service';

class orderController {
    public OrderService = new OrderService();

    public getordersbycustid = async ( req: Request , res : Response ,next:NextFunction) => {
        try{ 
            const customerid = Number(req.params.customer_id)
            const findAllOrderData : any =await this.OrderService.findAllOrderbycustomer(customerid);

            res.status(200).json(findAllOrderData);
           
        }catch(error){
            next(error);
        }
    };
    public getordersbyorderid = async ( req: Request , res : Response ,next:NextFunction) => {
        try{ 
            const orderid = Number(req.params.order_id)
            const findAllOrderData : any =await this.OrderService.findAllOrderbyorderid(orderid);

            res.status(200).json(findAllOrderData);
           
        }catch(error){
            next(error);
        }
    };
    public createOrder = async ( req: Request , res : Response ,next:NextFunction) => {
        try{ 
            const orderInput = (req.body)
            const placeOrder : any =await this.OrderService.createOrder(orderInput);

            res.status(200).json(placeOrder);
           
        }catch(error){
            next(error);
        }
    };
    

    
}



export default orderController;