import CustomerService from '@/services/customer.service';
import { NextFunction, Request, Response } from 'express';

class CustomerController {
  public customerService = new CustomerService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: any = req.body;
      const signUpUserData: String = await this.customerService.signup(customerData);
      res.status(200).json({ message: signUpUserData });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: any = req.body;
      const user: any = await this.customerService.login(loginData);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
