"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const addresses_controller_1 = (0, tslib_1.__importDefault)(require("@controllers/addresses.controller"));
class AddressRoute {
    constructor() {
        this.path = '/addresses';
        this.router = (0, express_1.Router)();
        this.addressController = new addresses_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // console.log('Initializing routes...');
        // console.log('this.addressController:', this.addressController);
        this.router.get(`${this.path}`, this.addressController.getAddresses);
        this.router.get(`${this.path}/:id`, this.addressController.getAddressById);
        this.router.get(`${this.path}/cust/:customer_id`, this.addressController.getAddressByCustId);
        this.router.post(`${this.path}`, this.addressController.createAddress);
        this.router.put(`${this.path}/:id`, this.addressController.updateAddress);
        this.router.put(`${this.path}/delete/:id`, this.addressController.deleteAddress);
    }
}
exports.default = AddressRoute;
//# sourceMappingURL=addresses.route.js.map