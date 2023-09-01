"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const products_controller_1 = (0, tslib_1.__importDefault)(require("@controllers/products.controller")); // Adjust the import path accordingly
const product_dto_1 = require("@dtos/product.dto"); // Adjust the import path accordingly
const validation_middleware_1 = (0, tslib_1.__importDefault)(require("@middlewares/validation.middleware"));
class ProductsRoute {
    constructor() {
        this.path = '/products';
        this.router = (0, express_1.Router)();
        this.productsController = new products_controller_1.default(); // Update the controller name
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.productsController.getProducts);
        //this.router.get(`${this.path}/:id(\\d+)`, this.productsController.getProductById);
        //this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
        this.router.put(`${this.path}/:id(\\d+)`, (0, validation_middleware_1.default)(product_dto_1.CreateProductDto, 'body', true), this.productsController.updateProduct);
        this.router.get(`${this.path}/:productId(\\d+)`, this.productsController.getProductInfo);
        // this.router.delete(`${this.path}/:id(\\d+)`, this.productsController.deleteProduct);
        // Add other routes if needed
        this.router.get('/getCommoditiesByType', this.productsController.getCommoditiesByType);
        this.router.get('/products/getProductByStoke', this.productsController.getProductByStoke);
        this.router.post('/admin/products/createProduct', this.productsController.createProductThree);
    }
}
exports.default = ProductsRoute;
//# sourceMappingURL=product.route.js.map