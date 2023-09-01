import { NextFunction, Request, Response } from 'express';
import CommodityService from '@/services/commoditys.service';
declare class CommodityController {
    CommodityService: CommodityService;
    getCommodities: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCommoditiesById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCommodity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCommodity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletecommodity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default CommodityController;
