import { Router } from 'express';
import CommodityTypeController from '@controllers/commodity_types.controller';
import { Routes } from '@interfaces/routes.interface';



class CommodityTypeRoute implements Routes {
  public path = '/commodityTypes';
  public router = Router();
  public commodityTypeController = new CommodityTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  this.commodityTypeController.getCommodityTypes);
    this.router.get(`${this.path}/:id(\\d+)`,  this.commodityTypeController.getCommodityTypeById);
    this.router.post(`${this.path}`,  this.commodityTypeController.createCommodityType);
    this.router.put(`${this.path}/:id(\\d+)`,   this.commodityTypeController.updateCommodityType);
    this.router.delete(`${this.path}/:id(\\d+)`, this.commodityTypeController.deleteCommodityType);
  }
}

export default CommodityTypeRoute;


// validationMiddleware(CreateCommodityTypeDto, 'body'),
//validationMiddleware(CreateCommodityTypeDto, 'body', true),