import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Define the interface for the FCM model
export interface FCMAttributes {
  customer_id: number;
  fcm_token: string;
}

export type FCMMetaAttributes = Optional<FCMAttributes, 'customer_id'>;

export class FCMModel extends Model<FCMAttributes, FCMMetaAttributes> implements FCMAttributes {
  public customer_id: number;
  public fcm_token: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof FCMModel {
  FCMModel.init(
    {
      customer_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      fcm_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'FCM', // Adjust the table name as needed
      sequelize,
    }
  );

  return FCMModel;
}
