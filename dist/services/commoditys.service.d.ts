import { Commodity } from '@interfaces/commodity.interface';
import { CreateCommodityDto } from '@dtos/commoditys.dto';
declare class CommodityService {
    commodities: typeof import("@/models/commodity.model").CommodityModel;
    private sequelize;
    findAllCommodities(): Promise<Commodity[]>;
    findCommodityById(commodity_id: number): Promise<Commodity>;
    createCommodity(commodityData: CreateCommodityDto): Promise<Commodity>;
    updateCommodity(commodityId: number, commodityData: CreateCommodityDto): Promise<Commodity>;
    deleteCommodity(commodityId: number): Promise<Commodity>;
}
export default CommodityService;
