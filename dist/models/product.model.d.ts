import { Sequelize, Model, Optional } from 'sequelize';
import { Product } from '@/interfaces/product.interface';
export declare type ProductAttributes = Optional<Product, 'product_id' | 'product_code'>;
export declare class ProductModel extends Model<Product, ProductAttributes> implements Product {
    product_id: number;
    product_name: string;
    product_desc: string;
    image_id: bigint;
    max_allowed_items: number;
    status: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    product_code: string;
}
export default function (sequelize: Sequelize): typeof ProductModel;
