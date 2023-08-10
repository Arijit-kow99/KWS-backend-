import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { product } from '@/interfaces/product.interface';

export type ProductAttributes = Optional<product, 'product_id' | 'product_code'>;

export class ProductModel extends Model<product, ProductAttributes> implements product {
  public product_id!: number;
  public product_name!: string;
  public product_desc!: string;
  public image_id!: bigint;
  public max_allowed_items!: number;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
  public product_code!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      product_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING(120),
      },
      product_desc: {
        type: DataTypes.STRING(255),
      },
      image_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'image',
          key: 'image_id',
        },
      },
      max_allowed_items: {
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
      product_code: {
        type: DataTypes.STRING(30),
      },
    },
    {
      tableName: 'products',
      sequelize,
      indexes: [
        // Create a unique index on product_code
        {
          unique: true,
          fields: ['product_code'],
        },
      ],
    },
  );

  return ProductModel;
}
