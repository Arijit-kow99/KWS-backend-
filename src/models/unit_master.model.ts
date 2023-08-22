// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Unitmaster } from '@interfaces/unit_master.interface';

// Define the creation attributes for the UnitMaster
export type UnitMasterCreationAttributes = Optional<Unitmaster, 'unit_master_id'>;

// Define the Sequelize model for the UnitMaster
export class UnitMasterModel extends Model<Unitmaster, UnitMasterCreationAttributes> implements Unitmaster {
  public unit_master_id!: number;
  public unit_name!: string;


}

// Define the initialization function for the UnitMaster model
export default function (sequelize: Sequelize): typeof UnitMasterModel {
  UnitMasterModel.init(
    {
      unit_master_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      unit_name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
    },
    {
      tableName: 'unit_master', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return UnitMasterModel;
}
