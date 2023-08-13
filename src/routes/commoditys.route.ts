import { Router } from 'express';
import  CommodityController from '@controllers/commoditys.controller'
import { CreateCommodityDto } from '@dtos/commoditys.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
// import authMiddleware from '@middlewares/auth.middleware';

class CommoditysRoute implements Routes {
  public path = '/commoditys';
  public router = Router();
  public commoditysController = new CommodityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  this.commoditysController.getCommodities);
    this.router.get(`${this.path}/:commodity_id`,  this.commoditysController.getCommoditiesById);
    // this.router.post(`${this.path}`,  this.commoditysController.createCommodity);
    // this.router.put(`${this.path}/:id(\\d+)`,  validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`,  this.usersController.deleteUser);
    // this.router.post(`${this.path}/changepassword`,  this.usersController.changepassword);
  }
}

export default CommoditysRoute;