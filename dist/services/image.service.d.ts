/// <reference types="node" />
import { Sequelize } from 'sequelize';
declare class ImageService {
    products: typeof import("../models/product.model").ProductModel;
    connection: Sequelize;
    getImageDataById(imageId: number): Promise<any>;
    insertImage(imageBuffer: Buffer): Promise<any>;
}
export default ImageService;
