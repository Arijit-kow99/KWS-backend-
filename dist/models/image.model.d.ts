/// <reference types="node" />
import { Sequelize, Model, Optional } from 'sequelize';
import { image } from '@/interfaces/image.interface';
export declare type imageAttributes = Optional<image, 'image_id'>;
export declare class imageModel extends Model<image, imageAttributes> implements image {
    image_id: number;
    image_type: number;
    image_data: Buffer;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof imageModel;
