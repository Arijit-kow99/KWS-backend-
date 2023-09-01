import { Price } from '@/interfaces/price.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';



// Optional attributes (excluding the primary key) for use with `create` and `build`
export type PriceCreationAttributes = Optional<Price, 'product_price_id'>;

// Define the "Price" model class
export class PriceModel extends Model<Price, PriceCreationAttributes>
  implements Price {
  public product_price_id!: number;
  public product_id!: number;
  public mrp!: number;
  public selling_price!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
  public start_date!: Date;
  public end_date!: Date;
}

// Export the model function
export default function (sequelize: Sequelize): typeof PriceModel {
  PriceModel.init(
    {
      product_price_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Stock', // Replace with the actual model name for products
            key: 'product_price_id', // Replace with the actual primary key field for products
          }
        
      },
      product_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Product', // Replace with the actual model name for products
          key: 'product_id', // Replace with the actual primary key field for products
        },
        allowNull: false,
      },
      mrp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      selling_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'price',
      sequelize,
    }
  );

  return PriceModel;
}
