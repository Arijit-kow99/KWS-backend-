import { HttpException } from '@exceptions/HttpException';
import { Commodity } from '@interfaces/commodity.interface';
import { isEmpty } from '@utils/util';
import DB from '@databases';
import { CreateCommodityDto } from '@dtos/commoditys.dto';
import commodityModel from '@/models/commodity.model';
import imageModel from '@/models/image.model';
import { QueryTypes } from 'sequelize';

class CommodityService {
  
  public commodities = DB.Commoditys;
  private sequelize = DB.sequelize;
  

  public async findAllCommodities(): Promise<Commodity[]> {
     const allCommodities: Commodity[] = await this.commodities.findAll({
      where:{
        status :1
      }
     });
    // let query = `Select * from commodity `;
    // const allCommodities: Commodity[] = await this.sequelize.query(query,{type: QueryTypes.SELECT} );
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
  ): Promise<any> {
    if (isEmpty(commodityData)) throw new HttpException(500, 'Invalid Commodity Data');

    const findCommodity: Commodity = await this.commodities.findByPk(commodityId);
    if (!findCommodity) throw new HttpException(500, 'Commodity not found');

    await this.commodities.update(commodityData, { where: { commodity_id: commodityId } });

   // const updatedCommodity: Commodity = await this.commodities.findByPk(commodityId);
    const message  = "Commodity updated succesfully"; 
   return message ;
  }

  public async deleteCommodity(commodityId: number): Promise<Commodity> {
    if (isEmpty(commodityId)) throw new HttpException(500, 'Invalid Commodity');
  
    const findCommodity: Commodity | null = await this.commodities.findByPk(commodityId);
    if (!findCommodity) throw new HttpException(500, 'Commodity not found');
  
    // Updating the status to 0
    await this.commodities.update(
      { status: 0 },
      { where: { commodity_id: commodityId } }
    );
    return findCommodity;
  }
}

export default CommodityService;