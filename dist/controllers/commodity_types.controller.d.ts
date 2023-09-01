import { NextFunction, Request, Response } from 'express';
import CommodityTypeService from '@services/commodity_types.service';
declare class CommodityTypeController {
    commodityTypeService: CommodityTypeService;
    getCommodityTypes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCommodityTypeById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCommodityType: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCommodityType: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCommodityType: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default CommodityTypeController;
