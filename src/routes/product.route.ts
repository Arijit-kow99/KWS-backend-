import { Router } from 'express';
import ProductsController from '@controllers/products.controller'; // Adjust the import path accordingly
import { CreateProductDto } from '@dtos/product.dto'; // Adjust the import path accordingly
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController(); // Update the controller name

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    //this.router.get(`${this.path}/:id(\\d+)`, this.productsController.getProductById);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateProductDto, 'body', true), this.productsController.updateProduct);
    this.router.get(`${this.path}/:productId(\\d+)`, this.productsController.getProductInfo);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.productsController.deleteProduct);
    // Add other routes if needed
    this.router.get('/getCommoditiesByType', this.productsController.getCommoditiesByType);
    this.router.get('/products/getProductByStoke', this.productsController.getProductByStoke);
    this.router.post('/admin/products/createProduct', this.productsController.createProductThree);
  }
}

export default ProductsRoute;
