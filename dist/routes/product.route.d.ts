import ProductsController from '@controllers/products.controller';
import { Routes } from '@interfaces/routes.interface';
declare class ProductsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    productsController: ProductsController;
    constructor();
    private initializeRoutes;
}
export default ProductsRoute;
