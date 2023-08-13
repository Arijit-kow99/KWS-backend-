import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { image } from '@/interfaces/image.interface';

export type imageAttributes = Optional<image, 'image_id'>;

export class imageModel extends Model<image, imageAttributes> implements image {
  public image_id!: number;
  public image_type!: number;
  public image_data!: Buffer;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof imageModel {
  imageModel.init(
    {
      image_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      image_type: {
        type: DataTypes.INTEGER,
      },
      image_data: {
        type: DataTypes.BLOB,
      },
    },
    {
      tableName: 'images',
      sequelize,
    },
  );

  return imageModel;
}
