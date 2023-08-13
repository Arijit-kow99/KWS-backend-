import { HttpException } from '@exceptions/HttpException';
import { Commodity } from '@interfaces/commodity.interface';
import { isEmpty } from '@utils/util';
import DB from '@databases';
import { CreateCommodityDto } from '@dtos/commoditys.dto';

class CommodityService {
  public commodities = DB.Commoditys;

  public async findAllCommodities(): Promise<Commodity[]> {
    const allCommodities: Commodity[] = await this.commodities.findAll();
    return allCommodities;
  }

  public async findCommodityById(commodity_id: number): Promise<Commodity> {
    if (isEmpty(commodity_id)) throw new HttpException(500, 'Invalid Commodity');

    const findCommodity: Commodity = await this.commodities.findByPk(commodity_id);
    if (!findCommodity) throw new HttpException(500, 'Commodity not found');

    return findCommodity;
  }

  public async createCommodity(commodityData: CreateCommodityDto): Promise<Commodity> {
    if (isEmpty(commodityData)) throw new HttpException(500, 'Invalid Commodity Data');

    const createCommodityData: Commodity = await this.commodities.create(commodityData);
    return createCommodityData;
  }

  public async updateCommodity(
    commodityId: number,
    commodityData: CreateCommodityDto
  ): Promise<Commodity> {
    if (isEmpty(commodityData)) throw new HttpException(500, 'Invalid Commodity Data');

    const findCommodity: Commodity = await this.commodities.findByPk(commodityId);
    if (!findCommodity) throw new HttpException(500, 'Commodity not found');

    await this.commodities.update(commodityData, { where: { commodity_id: commodityId } });

    const updatedCommodity: Commodity = await this.commodities.findByPk(commodityId);
    return updatedCommodity;
  }

  public async deleteCommodity(commodityId: number): Promise<Commodity> {
    if (isEmpty(commodityId)) throw new HttpException(500, 'Invalid Commodity');

    const findCommodity: Commodity = await this.commodities.findByPk(commodityId);
    if (!findCommodity) throw new HttpException(500, 'Commodity not found');

    await this.commodities.destroy({ where: { commodity_id: commodityId } });

    return findCommodity;
  }
}

export default CommodityService;