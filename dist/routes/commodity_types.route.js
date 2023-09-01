"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const commodity_types_controller_1 = (0, tslib_1.__importDefault)(require("@controllers/commodity_types.controller"));
class CommodityTypeRoute {
    constructor() {
        this.path = '/commodityTypes';
        this.router = (0, express_1.Router)();
        this.commodityTypeController = new commodity_types_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.commodityTypeController.getCommodityTypes);
        this.router.get(`${this.path}/:id(\\d+)`, this.commodityTypeController.getCommodityTypeById);
        this.router.post(`${this.path}`, this.commodityTypeController.createCommodityType);
        this.router.put(`${this.path}/:id(\\d+)`, this.commodityTypeController.updateCommodityType);
        this.router.delete(`${this.path}/:id(\\d+)`, this.commodityTypeController.deleteCommodityType);
    }
}
exports.default = CommodityTypeRoute;
// validationMiddleware(CreateCommodityTypeDto, 'body'),
//validationMiddleware(CreateCommodityTypeDto, 'body', true),
//# sourceMappingURL=commodity_types.route.js.map