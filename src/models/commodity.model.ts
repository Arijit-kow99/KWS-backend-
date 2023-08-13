// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import  {Commodity}  from '@interfaces/commodity.interface';

// Define the creation attributes for the Commodity
export type CommodityCreationAttributes = Optional<
  Commodity,
  'commodity_id' | 'created_on' | 'updated_on'
>;


// Define the Sequelize model for the Commodity
export class CommodityModel extends Model<Commodity, CommodityCreationAttributes>
  implements Commodity {
  public commodity_id!: number;
  public commodity_name!: string;
  public commodity_type_id!: number;
  public image_id!: number;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
  public commodity_code!: string;

  public  createdAt!: Date;
  public  updatedAt!: Date;
}

// Define the initialization function for the Commodity model
export default function (sequelize: Sequelize): typeof CommodityModel {
  CommodityModel.init(
    {
      commodity_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      commodity_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
      },
      commodity_type_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      image_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      status: {
        allowNull: false,
        type: DataTypes.TINYINT,
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
      commodity_code: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
      },
    },
    {
      tableName: 'commodity', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return CommodityModel;
}
