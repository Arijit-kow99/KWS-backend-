"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const order_controller_1 = (0, tslib_1.__importDefault)(require("@/controllers/order.controller"));
// import authMiddleware from '@middlewares/auth.middleware';
class OrderRoute {
    constructor() {
        this.path = '/order';
        this.router = (0, express_1.Router)();
        this.orderController = new order_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/cust/:customer_id`, this.orderController.getordersbycustid);
        this.router.get(`${this.path}/:order_id`, this.orderController.getordersbyorderid);
        this.router.post(`${this.path}/CreateOrder`, this.orderController.createOrder);
        // this.router.post(`${this.path}/Calculateorderprice`,this.orderController.calculateOrderprice);  
    }
}
exports.default = OrderRoute;
//# sourceMappingURL=order.route.js.map