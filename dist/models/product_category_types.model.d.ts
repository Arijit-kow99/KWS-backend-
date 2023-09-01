import { Sequelize, Model, Optional } from 'sequelize';
import { ProductCategoryType } from '@/interfaces/product_category_types.interface';
export declare type ProductCategoryTypeAttributes = Optional<ProductCategoryType, 'product_category_types_id' | 'updated_on' | 'updated_by'>;
export declare class ProductCategoryTypeModel extends Model<ProductCategoryType, ProductCategoryTypeAttributes> implements ProductCategoryType {
    product_category_types_id: number;
    commodity_type: number;
    product_id: number;
    allowed_items: number;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof ProductCategoryTypeModel;
