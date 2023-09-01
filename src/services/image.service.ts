import DB from '@databases'; // Adjust the import path accordingly
import { CreateProductDto } from '@dtos/product.dto'; // Adjust the import path accordingly
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/product.interface'; // Adjust the import path accordingly
import { isEmpty } from '@utils/util';
import { Sequelize } from 'sequelize';
class ImageService {
   // public products = DB.Products; // Use the appropriate database model for products
  public connection=DB.sequelize;
  public async getImageDataById(imageId: number): Promise<any> {
    try {
      console.log(imageId)
      const queryResult: any = await this.connection.query(`SELECT image_data FROM image WHERE image_id = ${imageId}`);
      
      if (queryResult && queryResult[0] && queryResult[0][0]) {
        return queryResult[0][0].image_data;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving image:', error);
      throw new Error('Internal server error');
    }
  }
  public async insertImage(imageBuffer: Buffer): Promise<any> {
    try {
      const result: any = await this.connection.query('INSERT INTO image ( image_data) VALUES ( ?)', {replacements:[imageBuffer]});
      return result[0];
    } catch (error) {
      console.error('Error inserting image:', error);
      throw new Error('Internal server error');
    }
  }
}
export default ImageService;