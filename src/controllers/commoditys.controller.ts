import {NextFunction , Request , Response} from 'express';
import { CreateCommodityDto } from '@/dtos/commoditys.dto';
import { Commodity } from '@/interfaces/commodity.interface';
import CommodityService from '@/services/commoditys.service';

class CommodityController {
    public CommodityService = new CommodityService();

    public getCommodities = async ( req: Request , res : Response ,next:NextFunction) => {
        try{
            const findAllCommoditiesData : Commodity[] =await this.CommodityService.findAllCommodities();

            res.status(200).json(findAllCommoditiesData);
        }catch(error){
            next(error);
        }
    };
    public getCommoditiesById = async (req: Request , res : Response , next:NextFunction) => {
        try{
            const commodityId =Number(req.params.commodity_id);
            const findonecommoditydata : Commodity = await this.CommodityService.findCommodityById(commodityId);

            res.status(200).json(findonecommoditydata);
        }catch(error){
            next(error);
        }
    };
    public createCommodity =  async (req: Request , res : Response ,next:NextFunction) => {
        try{
            const commodityData : CreateCommodityDto = req.body;
            const createcommodityData : Commodity  = await this.CommodityService.createCommodity(commodityData);

            res.status(201).json({ message: 'Commodity created succesfully created id:' + createcommodityData.commodity_id});
        }catch(error)
        {
            next(error)
        }
    };
    public updateCommodity = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const commodityId = Number(req.params.id);
          const commodityData: CreateCommodityDto = req.body;
          const updatecommodityData: Commodity = await this.CommodityService.updateCommodity(commodityId, commodityData);
    
          res.status(200).json({ message: 'User successfully updated for ' + updatecommodityData.commodity_id });
        } catch (error) {
          next(error);
        }
      };
      public deletecommodity = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const commodityId = Number(req.params.id);
          const deletecommodityData: Commodity = await this.CommodityService.deleteCommodity(commodityId);
    
          res.status(200).json({ message: 'Commod deleted' });
        } catch (error) {
          next(error);
        }
      };
    
}



export default CommodityController;