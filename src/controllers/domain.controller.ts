import { NextFunction, Request, Response } from 'express';
import { CreateCommodityTypeDto } from '@dtos/commodity_types.dto';
import { CommodityType } from '@interfaces/commodity_type.interface';
import CommodityTypeService from '@services/commodity_types.service';
import { Domain } from '@/interfaces/domain.interface';
import DomainService from '@/services/domain.service';

class domainController {
 
  public DomainService = new DomainService();

  public getdomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const domain_type= String(req.params.domain_type)
      console.log(domain_type);
      const findAlldomainData: any = await this.DomainService.findAllDomain(domain_type);

      res.status(200).json(findAlldomainData);
    } catch (error) {
      next(error);
    }
  };
}

export default domainController;
