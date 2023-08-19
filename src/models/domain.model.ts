// Import necessary modules
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Domain } from '@interfaces/domain.interface';

// Define the creation attributes for the Domain
export type DomainCreationAttributes = Optional<Domain, 'domain_id'>;

// Define the Sequelize model for the Domain
export class DomainModel extends Model<Domain, DomainCreationAttributes> implements Domain {
  public domain_id!: number;
  public domain_code!: string;
  public domain_value!: string;
  public domain_text!: string;


}

// Define the initialization function for the Domain model
export default function (sequelize: Sequelize): typeof DomainModel {
  DomainModel.init(
    {
      domain_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      domain_code: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      domain_value: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      domain_text: {
        allowNull: false,
        type: DataTypes.STRING(125),
      },
    },
    {
      tableName: 'domain', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return DomainModel
}