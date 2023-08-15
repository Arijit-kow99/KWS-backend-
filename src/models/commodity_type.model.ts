// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { CommodityType } from '@interfaces/commodity_type.interface'; // Make sure to import the correct interface

// Define the creation attributes for the CommodityType
export type CommodityTypeCreationAttributes = Optional<
  CommodityType,
  'commodity_type_id' | 'created_on' | 'updated_on'
>;

// Define the Sequelize model for the CommodityType
export class CommodityTypeModel extends Model<CommodityType, CommodityTypeCreationAttributes>
  implements CommodityType {
  public commodity_type_id!: number;
  public commodity_type_name!: string;
  public status!: number;
  public created_on!: Date;
  public created_by!: number;
  public updated_on!: Date;
  public updated_by!: number;
}

// Define the initialization function for the CommodityType model
export default function (sequelize: Sequelize): typeof CommodityTypeModel {
  CommodityTypeModel.init(
    {
      commodity_type_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      commodity_type_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 1,
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
    },
    {
      tableName: 'commodity_type', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return CommodityTypeModel;
}
