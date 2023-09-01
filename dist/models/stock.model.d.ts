import { Sequelize, Model, Optional } from 'sequelize';
import { Stock } from '@interfaces/stock.interface';
export declare type StockCreationAttributes = Optional<Stock, 'product_price_id' | 'created_on' | 'updated_on'>;
export declare class StockModel extends Model<Stock, StockCreationAttributes> implements Stock {
    product_price_id: number;
    product_id: number;
    mrp: number;
    selling_price: number;
    quantity: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    effective_on: Date;
}
export default function (sequelize: Sequelize): typeof StockModel;
