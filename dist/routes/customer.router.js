"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const customer_controller_1 = (0, tslib_1.__importDefault)(require("@/controllers/customer.controller"));
const express_1 = require("express");
class CustomerRoute {
    constructor() {
        this.path = '/customer';
        this.router = (0, express_1.Router)();
        this.customerController = new customer_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.customerController.signUp);
        this.router.post(`${this.path}/login`, this.customerController.login);
        this.router.post(`${this.path}/changepassword`, this.customerController.changepassword);
        this.router.get(`${this.path}/`, this.customerController.getCustomer);
    }
}
exports.default = CustomerRoute;
//# sourceMappingURL=customer.router.js.map