import { CreateCustomerDto } from '@/dtos/customer.dto';
import { Customer } from '@/interfaces/customer.interfcae';
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
  public changepassword =async (req: Request, res: Response, next: NextFunction)=>{
    try{
      const reqs= req.body;
      const deleteCustomerData: any =await this.customerService.changepassword(reqs);

      res.status(200).json({ message : 'Password changed succesfully'});
    }catch (error){
      next(error);
    }
  };
  public getCustomer = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const findallcustomer: Customer[] = await this.customerService.findAllCustomer();

        res.status(200).json(findallcustomer);
    }catch(error){
      next(error);
    }
};


public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.id);
    console.log(customerId)
    const customerData: CreateCustomerDto = req.body;
    const updatedCustomerData: Customer = await this.customerService.updateCustomer(customerId, customerData);

    res.status(200).json({ message: 'Customer successfully updated'+ updatedCustomerData.customer_id });
  } catch (error) {
    next(error);
  }
};
}

export default CustomerController;
