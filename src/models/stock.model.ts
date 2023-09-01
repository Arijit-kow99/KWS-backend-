// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Stock } from '@interfaces/stock.interface';

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
  public effective_on!: Date; // Remove the duplicate declaration here

  // Remove this duplicate declaration of effective_on
  // effective_on: Date;

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
     
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_on: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      created_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      updated_on: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      effective_on: {
        allowNull: true,
        type: DataTypes.DATE, // Add this field definition
      },
    },
    {
      tableName: 'stock', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return StockModel;
}
