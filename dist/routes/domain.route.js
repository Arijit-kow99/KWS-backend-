"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const domain_controller_1 = (0, tslib_1.__importDefault)(require("@/controllers/domain.controller"));
class DomainRoute {
    constructor() {
        this.path = '/paymentmethods';
        this.router = (0, express_1.Router)();
        this.domainController = new domain_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.domainController.getdomain);
    }
}
exports.default = DomainRoute;
//# sourceMappingURL=domain.route.js.map