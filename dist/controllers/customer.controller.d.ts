import CustomerService from '@/services/customer.service';
import { NextFunction, Request, Response } from 'express';
declare class CustomerController {
    customerService: CustomerService;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changepassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCustomer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default CustomerController;
