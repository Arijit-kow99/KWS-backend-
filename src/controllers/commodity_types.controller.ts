import { NextFunction, Request, Response } from 'express';
import { CreateCommodityTypeDto } from '@dtos/commodity_types.dto';
import { CommodityType } from '@interfaces/commodity_types.interface';
import CommodityTypeService from '@services/commodity_types.service';

class CommodityTypeController {
  public commodityTypeService = new CommodityTypeService();

  public getCommodityTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCommodityTypesData: CommodityType[] = await this.commodityTypeService.findAllCommodityTypes();

      res.status(200).json(findAllCommodityTypesData);
    } catch (error) {
      next(error);
    }
  };

  public getCommodityTypeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commodityTypeId = Number(req.params.id);
      const findCommodityTypeData: CommodityType = await this.commodityTypeService.findCommodityTypeById(commodityTypeId);

      res.status(200).json(findCommodityTypeData);
    } catch (error) {
      next(error);
    }
  };

  public createCommodityType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commodityTypeData: CreateCommodityTypeDto = req.body;
      const createCommodityTypeData: CommodityType = await this.commodityTypeService.createCommodityType(commodityTypeData);
console.log(req.body);
      res.status(201).json({ message: 'CommodityType successfully created id: ' + createCommodityTypeData.commodity_type_id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateCommodityType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commodityTypeId = Number(req.params.id);
      const commodityTypeData: CreateCommodityTypeDto = req.body;
      const updateCommodityTypeData: CommodityType = await this.commodityTypeService.updateCommodityType(commodityTypeId, commodityTypeData);

      res.status(200).json({ message: 'CommodityType successfully updated for ' + updateCommodityTypeData.commodity_type_id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteCommodityType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commodityTypeId = Number(req.params.id);
      const deleteCommodityTypeData: CommodityType = await this.commodityTypeService.deleteCommodityType(commodityTypeId);

      res.status(200).json({ message: 'CommodityType deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommodityTypeController;
