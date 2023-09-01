"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const product_service_1 = (0, tslib_1.__importDefault)(require("@services/product.service"));
class ProductsController {
    constructor() {
        this.productService = new product_service_1.default(); // Update the service name to match your product service
        this.getProducts = async (req, res, next) => {
            try {
                const findAllProductsData = await this.productService.findAllProducts();
                res.status(200).json(findAllProductsData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getProductById = async (req, res, next) => {
            try {
                const productId = Number(req.params.id);
                const findOneProductData = await this.productService.findProductById(productId);
                res.status(200).json(findOneProductData);
            }
            catch (error) {
                next(error);
            }
        };
        this.createProduct = async (req, res, next) => {
            try {
                const productData = req.body;
                const createProductData = await this.productService.createProduct(productData);
                res.status(201).json({ message: 'Product successfully created id: ' + createProductData.product_id });
            }
            catch (error) {
                console.error("Error creating product:", error);
                next(error);
            }
        };
        this.updateProduct = async (req, res, next) => {
            try {
                const productId = Number(req.params.id);
                const productData = req.body;
                const updateProductData = await this.productService.updateProduct(productId, productData);
                res.status(200).json({ message: 'Product successfully updated for ' + updateProductData.product_id });
            }
            catch (error) {
                next(error);
            }
        };
        // get all product with details
        this.getProductInfo = async (req, res, next) => {
            try {
                const productId = Number(req.params.productId);
                const productInfo = await this.productService.getProductInfo(productId);
                res.status(200).json(productInfo);
            }
            catch (error) {
                next(error);
            }
        };
        // commodity with type
        this.getCommoditiesByType = async (req, res) => {
            try {
                const structuredData = await this.productService.getCommoditiesByType();
                res.json(structuredData);
            }
            catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        // product with data
        this.getProductByStoke = async (req, res) => {
            try {
                const structuredData = await this.productService.getProductByStoke();
                res.json(structuredData);
            }
            catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        //insert three data
        this.createProductThree = async (req, res, next) => {
            try {
                const jsonData = req.body;
                console.log("con:", jsonData);
                await this.productService.insertOrderData(jsonData);
                return res.status(200).json({ message: "Data inserted successfully" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        };
    }
}
exports.default = ProductsController;
//# sourceMappingURL=products.controller.js.map