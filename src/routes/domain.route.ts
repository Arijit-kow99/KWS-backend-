import { Router } from 'express';
import CommodityTypeController from '@controllers/commodity_types.controller';
import { Routes } from '@interfaces/routes.interface';
import domainController from '@/controllers/domain.controller';



class DomainRoute implements Routes {
  public path = '/domain';
  public router = Router();
  public domainController = new domainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  this.domainController.getdomain);
    
  }
}

export default DomainRoute;


