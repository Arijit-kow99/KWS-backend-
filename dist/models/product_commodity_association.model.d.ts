import { Sequelize, Model, Optional } from 'sequelize';
import { ProductCommodityAssociation } from '@/interfaces/Product_Commodity_Association.interface';
export declare type ProductCommodityAssociationAttributes = Optional<ProductCommodityAssociation, 'product_commodity_association_id' | 'updated_on' | 'updated_by'>;
export declare class ProductCommodityAssociationModel extends Model<ProductCommodityAssociation, ProductCommodityAssociationAttributes> implements ProductCommodityAssociation {
    product_commodity_association_id: number;
    commodity_id: number;
    product_id: number;
    product_category_types_id: number;
    measurement_unit: string;
    quantity: number;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof ProductCommodityAssociationModel;
