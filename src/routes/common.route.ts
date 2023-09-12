

import { Router } from 'express';
import ImageController from '@controllers/image.controller'; // Adjust the import path accordingly
import { CreateImageDto } from '@dtos/image.dto'; // Adjust the import path accordingly
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import multer from "multer";

class CommonRoute implements Routes {
  public path = '/image';
  public router = Router();
  public storage = multer.memoryStorage(); // Store the uploaded file in memory
public upload = multer({ storage: this.storage, limits: { fileSize: 2 * 1024 * 1024 } });
  public imageController = new ImageController(); // Update the controller name

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/upload', this.upload.single('image'), this.imageController.uploadImage);
   
   // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateImageDto, 'body', true), this.productsController.updateProduct);
    this.router.get(`${this.path}/:id(\\d+)`, this.imageController.getImageById);
    this.router.get(`${this.path}/commodity/:id(\\d+)`, this.imageController.getImageByCommodityId);
   
    
  //  this.router.get('/products/getProductByStoke', this.productsController.getProductByStoke);
  //  this.router.post('/admin/products/createProduct', this.imageController.createProductThree);
  
}
}

export default CommonRoute;
