import { NextFunction, Request, Response } from 'express';
import { CreateProductDto } from '@dtos/product.dto'; // Adjust the import path accordingly
import { Product } from '@interfaces/product.interface'; // Adjust the import path accordingly
import productService from '@services/product.service'; // Adjust the import path accordingly

class ProductsController {
  public productService = new productService(); // Update the service name to match your product service

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: Product[] = await this.productService.findAllProducts();

      res.status(200).json(findAllProductsData);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.id);
      const findOneProductData: Product = await this.productService.findProductById(productId);

      res.status(200).json(findOneProductData);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ message: 'Product successfully created id: ' + createProductData.product_id });
    } catch (error) {
        console.error("Error creating product:", error);
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.id);
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json({ message: 'Product successfully updated for ' + updateProductData.product_id });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
