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
  // get all product with details

public getProductInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = Number(req.params.productId);
    const productInfo: any = await this.productService.getProductInfo(productId);

    res.status(200).json(productInfo);
  } catch (error) {
    next(error);
  }
};
// commodity with type
public getCommoditiesByType = async (req: Request, res: Response) => {
  try {
    const structuredData = await this.productService.getCommoditiesByType();
    res.json(structuredData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// product with data
public getProductByStoke = async (req: Request, res: Response) => {
  try {
    const structuredData = await this.productService.getProductByStoke();
    res.json(structuredData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//insert three data
public createProductThree = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const jsonData = req.body;
    console.log("con:",jsonData)
    await this.productService.insertOrderData(jsonData);
    return res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

}

export default ProductsController;
