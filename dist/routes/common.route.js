"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const image_controller_1 = (0, tslib_1.__importDefault)(require("@controllers/image.controller")); // Adjust the import path accordingly
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
class CommonRoute {
    constructor() {
        this.path = '/image';
        this.router = (0, express_1.Router)();
        this.storage = multer_1.default.memoryStorage(); // Store the uploaded file in memory
        this.upload = (0, multer_1.default)({ storage: this.storage, limits: { fileSize: 2 * 1024 * 1024 } });
        this.imageController = new image_controller_1.default(); // Update the controller name
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/upload', this.upload.single('image'), this.imageController.uploadImage);
        // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateImageDto, 'body', true), this.productsController.updateProduct);
        this.router.get(`${this.path}/:id(\\d+)`, this.imageController.getImageById);
        //  this.router.get('/products/getProductByStoke', this.productsController.getProductByStoke);
        //  this.router.post('/admin/products/createProduct', this.imageController.createProductThree);
    }
}
exports.default = CommonRoute;
//# sourceMappingURL=common.route.js.map