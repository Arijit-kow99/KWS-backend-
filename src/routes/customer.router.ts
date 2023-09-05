import CustomerController from '@/controllers/customer.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class CustomerRoute implements Routes {
  public path = '/customer';
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.customerController.signUp);
    this.router.post(`${this.path}/login`, this.customerController.login);
    this.router.post(`${this.path}/changepassword`, this.customerController.changepassword);
    this.router.get(`${this.path}/`, this.customerController.getCustomer);
    this.router.post(`${this.path}/cust/:id`, this.customerController.updateCustomer);

      }
}

export default CustomerRoute;
