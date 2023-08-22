import { Domain } from '@/interfaces/domain.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';


export type DomainCreationAttributes = Optional<Domain, 'domain_id' >;


export class DomainModel extends Model<Domain, DomainCreationAttributes> implements Domain {
  domain_type: string;

  public domain_id!: number;
  public domain_code!: string;
  public domain_value!: string;
  public domain_text!: string;
  public created_on!: Date;
  public created_by!: number;

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
        domain_type: {
      allowNull: false,
      type: DataTypes.STRING(120), // Adjust the data type and length as needed
    },
    },
    {
      tableName: 'domain', // Make sure this matches your actual table name
      sequelize,
    }
  );

  return DomainModel;
}
