import { Sequelize, Model, Optional } from 'sequelize';
import { Commodity } from '@interfaces/commodity.interface';
export declare type CommodityCreationAttributes = Optional<Commodity, 'commodity_id' | 'created_on' | 'updated_on'>;
export declare class CommodityModel extends Model<Commodity, CommodityCreationAttributes> implements Commodity {
    commodity_id: number;
    commodity_name: string;
    commodity_type_id: number;
    image_id: number;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    commodity_code: string;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof CommodityModel;
