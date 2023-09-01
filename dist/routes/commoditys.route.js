"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const commoditys_controller_1 = (0, tslib_1.__importDefault)(require("@controllers/commoditys.controller"));
// import authMiddleware from '@middlewares/auth.middleware';
class CommoditysRoute {
    constructor() {
        this.path = '/commoditys';
        this.router = (0, express_1.Router)();
        this.commoditysController = new commoditys_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.commoditysController.getCommodities);
        this.router.get(`${this.path}/:commodity_id`, this.commoditysController.getCommoditiesById);
        // this.router.post(`${this.path}`,  this.commoditysController.createCommodity);
        // this.router.put(`${this.path}/:id(\\d+)`,  validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
        // this.router.delete(`${this.path}/:id(\\d+)`,  this.usersController.deleteUser);
        // this.router.post(`${this.path}/changepassword`,  this.usersController.changepassword);
    }
}
exports.default = CommoditysRoute;
//# sourceMappingURL=commoditys.route.js.map