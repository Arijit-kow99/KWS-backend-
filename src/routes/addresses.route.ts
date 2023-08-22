import { Router } from 'express';
import AddressController from '@controllers/addresses.controller';
import { Routes } from '@interfaces/routes.interface';


class AddressRoute implements Routes {
  public path = '/addresses';
  public router = Router();
  public addressController = new AddressController();

  constructor() {
  this.initializeRoutes();
  }

  private initializeRoutes() {
    // console.log('Initializing routes...');
    // console.log('this.addressController:', this.addressController);
    this.router.get(`${this.path}`,  this.addressController.getAddresses);
    this.router.get(`${this.path}/:id`,  this.addressController.getAddressById);
   this.router.get(`${this.path}/cus/:id`,  this.addressController.getjoinCustomerAndAddress);
    this.router.post(`${this.path}`,   this.addressController.createAddress);
    this.router.put(`${this.path}/:id`,  this.addressController.updateAddress);
    this.router.delete(`${this.path}/:id`,  this.addressController.deleteAddress);
  }
}

export default AddressRoute;