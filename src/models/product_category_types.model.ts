import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductCategoryType } from '@/interfaces/product_category_types.interface';

export type ProductCategoryTypeAttributes = Optional<ProductCategoryType, 'product_category_types_id' | 'updated_on' | 'updated_by'>;

export class ProductCategoryTypeModel extends Model<ProductCategoryType, ProductCategoryTypeAttributes> implements ProductCategoryType {
  public product_category_types_id!: number;
  public commodity_type!: number;
  public product_id!: number;
  public allowed_items!: number;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductCategoryTypeModel {
  ProductCategoryTypeModel.init(
    {
      product_category_types_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      commodity_type: {
        type: DataTypes.BIGINT,
        references: {
          model: 'commodity_types', // Replace with the actual table name of commodity 
          key: 'commodity_type_id', // Replace with the actual primary key and its id 
        },
      },
      product_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'product', 
          key: 'product_id', 
        },
      },
      allowed_items: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.TINYINT,
      },
      created_on: {
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_on: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'product_category_type',
      sequelize,
    },
  );

  return ProductCategoryTypeModel;
}
