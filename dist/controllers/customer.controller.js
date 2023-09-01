"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const customer_service_1 = (0, tslib_1.__importDefault)(require("@/services/customer.service"));
class CustomerController {
    constructor() {
        this.customerService = new customer_service_1.default();
        this.signUp = async (req, res, next) => {
            try {
                const customerData = req.body;
                const signUpUserData = await this.customerService.signup(customerData);
                res.status(200).json({ message: signUpUserData });
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const loginData = req.body;
                const user = await this.customerService.login(loginData);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.changepassword = async (req, res, next) => {
            try {
                const reqs = req.body;
                const deleteCustomerData = await this.customerService.changepassword(reqs);
                res.status(200).json({ message: 'Password changed succesfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getCustomer = async (req, res, next) => {
            try {
                const findallcustomer = await this.customerService.findAllCustomer();
                res.status(200).json(findallcustomer);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map