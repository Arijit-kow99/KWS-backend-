import { Sequelize, Model, Optional } from 'sequelize';
import { CommodityType } from '@interfaces/commodity_type.interface';
export declare type CommodityTypeCreationAttributes = Optional<CommodityType, 'commodity_type_id' | 'created_on' | 'updated_on'>;
export declare class CommodityTypeModel extends Model<CommodityType, CommodityTypeCreationAttributes> implements CommodityType {
    commodity_type_id: number;
    commodity_type_name: string;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
}
export default function (sequelize: Sequelize): typeof CommodityTypeModel;
