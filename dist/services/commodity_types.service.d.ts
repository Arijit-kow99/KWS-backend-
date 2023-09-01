import { CommodityType } from '@interfaces/commodity_type.interface';
declare class CommodityTypeService {
    commodityTypes: typeof import("../models/commodity_type.model").CommodityTypeModel;
    findAllCommodityTypes(): Promise<CommodityType[]>;
    findCommodityTypeById(commodityTypeId: number): Promise<CommodityType>;
    createCommodityType(commodityTypeData: any): Promise<CommodityType>;
    updateCommodityType(commodityTypeId: number, commodityTypeData: any): Promise<CommodityType>;
    deleteCommodityType(commodityTypeId: number): Promise<CommodityType>;
}
export default CommodityTypeService;
