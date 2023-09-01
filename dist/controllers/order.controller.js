"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const order_service_1 = (0, tslib_1.__importDefault)(require("@/services/order.service"));
const databases_1 = (0, tslib_1.__importDefault)(require("@/databases"));
class orderController {
    constructor() {
        this.OrderService = new order_service_1.default();
        this.sequelize = databases_1.default.sequelize;
        this.getordersbycustid = async (req, res, next) => {
            try {
                const customerid = Number(req.params.customer_id);
                const findAllOrderData = await this.OrderService.findAllOrderbycustomer(customerid);
                res.status(200).json(findAllOrderData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getordersbyorderid = async (req, res, next) => {
            try {
                const orderid = Number(req.params.order_id);
                const findAllOrderData = await this.OrderService.findAllOrderbyorderid(orderid);
                res.status(200).json(findAllOrderData);
            }
            catch (error) {
                next(error);
            }
        };
        this.createOrder = async (req, res, next) => {
            let transaction = await this.sequelize.transaction();
            try {
                const orderInput = (req.body);
                const placeOrder = await this.OrderService.createOrder(orderInput, transaction);
                await transaction.commit();
                res.status(200).json(placeOrder);
            }
            catch (error) {
                if (transaction) {
                    await transaction.rollback();
                }
                next(error);
            }
        };
    }
}
exports.default = orderController;
//# sourceMappingURL=order.controller.js.map