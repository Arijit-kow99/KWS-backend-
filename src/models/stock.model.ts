import { Stock } from '@/interfaces/stock.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Define the Stock interface


// Define the creation attributes for the Stock
export type StockCreationAttributes = Optional<
  Stock,
  'product_price_id' | 'created_on' | 'updated_on'
>;

// Define the Sequelize model for the Stock
export class StockModel extends Model<Stock, StockCreationAttributes> implements Stock {
  public product_price_id!: number;
  public product_id!: number;
  public mrp!: number;
  public selling_price!: number;
  public quantity!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
  public effective_on!: Date;
}

// Define the initialization function for the Stock model
export default function (sequelize: Sequelize): typeof StockModel {
  StockModel.init(
    {
      product_price_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      mrp: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      selling_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      updated_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      effective_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'stock', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return StockModel;
}
