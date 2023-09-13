import { NextFunction, Request, Response } from 'express';
import { CreateImageDto } from '@dtos/image.dto'; // Adjust the import path accordingly
import { Product } from '@interfaces/product.interface'; // Adjust the import path accordingly
import ImageService from '@services/image.service';
import multer from "multer";
const upload = multer();
class ImageController {
    public imageService = new ImageService(); 
        public getImageById = async (req: Request, res: Response,next: NextFunction) =>{
        const imageId = parseInt(req.params.id, 10);
    
        try {
          const imageBlob = await this.imageService.getImageDataById(imageId);
          if (imageBlob) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imageBlob);
          } else {
            res.status(404).send('Image not found');
          }
        } catch (error) {
          console.error('Error retrieving image:', error);
          res.status(500).send('Internal server error');
        }
      }
      public getImageByCommodityId = async (req: Request, res: Response,next: NextFunction) =>{
        const commodityId = parseInt(req.params.id, 10);
    
        try {
          const imageBlob = await this.imageService.getImageDataByCommodityId(commodityId);
          if (imageBlob) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imageBlob);
          } else {
            res.status(404).send('Image not found');
          }
        } catch (error) {
          console.error('Error retrieving image:', error);
          res.status(500).send('Internal server error');
        }
      }
      
      public uploadImage = async (req: any, res: Response, next: NextFunction) => {
        try {
          const imageBuffer = req.file.buffer;
    console.log(imageBuffer)
          if (!imageBuffer) {
            return res.status(400).json({ error: 'No image data uploaded' });
          }
    
          const insertedImageId = await this.imageService.insertImage(imageBuffer);
    
          return res.status(200).json({ message: 'Image inserted successfully', imageId: insertedImageId });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      };
}
export default ImageController;