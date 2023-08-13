import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductCommodityAssociation } from '@/interfaces/Product_Commodity_Association.interface';

export type ProductCommodityAssociationAttributes = Optional<
  ProductCommodityAssociation,
  'product_commodity_association_id' | 'updated_on' | 'updated_by'>;

export class ProductCommodityAssociationModel extends Model<
  ProductCommodityAssociation,
  ProductCommodityAssociationAttributes
> implements ProductCommodityAssociation {
  public product_commodity_association_id!: number;
  public commodity_id!: number;
  public product_id!: number;
  public product_category_types_id!: number;
  public measurement_unit!: string;
  public quantity!: number;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;

  public  createdAt!: Date;
  public  updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductCommodityAssociationModel {
  ProductCommodityAssociationModel.init(
    {
      product_commodity_association_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      commodity_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'commodity', // Replace with the actual table name
          key: 'commodity_id', // Replace with the actual primary key
        },
      },
      product_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'product', // Replace with the actual table name
          key: 'product_id', // Replace with the actual primary key
        },
      },
      product_category_types_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'product_category_types', // Replace with the actual table name
          key: 'product_category_types_id', // Replace with the actual primary key
        },
      },
      measurement_unit: {
        type: DataTypes.STRING, // Update with appropriate length if needed
      },
      quantity: {
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
      tableName: 'product_commodity_association',
      sequelize,
    }
  );

  return ProductCommodityAssociationModel;
}
