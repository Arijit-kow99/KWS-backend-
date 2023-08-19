import { CommodityType } from '@interfaces/commodity_type.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import DB from '@databases';


class CommodityTypeService {
  public commodityTypes = DB.commodityTypes;

  public async findAllCommodityTypes(): Promise<CommodityType[]> {
    const allCommodityTypes: CommodityType[] = await this.commodityTypes.findAll();
    return allCommodityTypes;
  }

  public async findCommodityTypeById(commodityTypeId: number): Promise<CommodityType> {
    if (isEmpty(commodityTypeId)) throw new HttpException(500, 'Invalid CommodityType');

    const findCommodityType: CommodityType = await this.commodityTypes.findByPk(commodityTypeId);
    if (!findCommodityType) throw new HttpException(500, 'Invalid CommodityType');

    return findCommodityType;
  }

  public async createCommodityType(commodityTypeData: any): Promise<CommodityType> {
    if (isEmpty(commodityTypeData)) throw new HttpException(500, 'Invalid CommodityType');

   const createCommodityTypeData: CommodityType = await this.commodityTypes.create(commodityTypeData);

    return createCommodityTypeData;
  }

  public async updateCommodityType(commodityTypeId: number, commodityTypeData: any): Promise<CommodityType> {
    if (isEmpty(commodityTypeData)) throw new HttpException(500, 'Invalid CommodityType');

    const findCommodityType: CommodityType = await this.commodityTypes.findByPk(commodityTypeId);
    if (!findCommodityType) throw new HttpException(500, 'Invalid CommodityType');

    await this.commodityTypes.update(commodityTypeData, { where: { commodity_type_id: commodityTypeId } });

    const updateCommodityTypeData: CommodityType = await this.commodityTypes.findByPk(commodityTypeId);
    return updateCommodityTypeData;
  }

  public async deleteCommodityType(commodityTypeId: number): Promise<CommodityType> {
    if (isEmpty(commodityTypeId)) throw new HttpException(500, 'Invalid CommodityType');

    const findCommodityType: CommodityType = await this.commodityTypes.findByPk(commodityTypeId);
    if (!findCommodityType) throw new HttpException(500, 'Invalid CommodityType');

    await this.commodityTypes.destroy({ where: { commodity_type_id: commodityTypeId } });

    return findCommodityType;
  }
}

export default CommodityTypeService;
