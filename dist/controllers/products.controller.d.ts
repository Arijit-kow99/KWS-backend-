import { NextFunction, Request, Response } from 'express';
import productService from '@services/product.service';
declare class ProductsController {
    productService: productService;
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProductInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCommoditiesByType: (req: Request, res: Response) => Promise<void>;
    getProductByStoke: (req: Request, res: Response) => Promise<void>;
    createProductThree: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
export default ProductsController;
