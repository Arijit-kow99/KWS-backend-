"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = (0, tslib_1.__importDefault)(require("@/app"));
const auth_route_1 = (0, tslib_1.__importDefault)(require("@routes/auth.route"));
const index_route_1 = (0, tslib_1.__importDefault)(require("@routes/index.route"));
const users_route_1 = (0, tslib_1.__importDefault)(require("@routes/users.route"));
const validateEnv_1 = (0, tslib_1.__importDefault)(require("@utils/validateEnv"));
const commoditys_route_1 = (0, tslib_1.__importDefault)(require("./routes/commoditys.route"));
const customer_router_1 = (0, tslib_1.__importDefault)(require("./routes/customer.router"));
const addresses_route_1 = (0, tslib_1.__importDefault)(require("./routes/addresses.route"));
const product_route_1 = (0, tslib_1.__importDefault)(require("./routes/product.route"));
const commodity_types_route_1 = (0, tslib_1.__importDefault)(require("./routes/commodity_types.route"));
const domain_route_1 = (0, tslib_1.__importDefault)(require("./routes/domain.route"));
const order_route_1 = (0, tslib_1.__importDefault)(require("./routes/order.route"));
const common_route_1 = (0, tslib_1.__importDefault)(require("./routes/common.route"));
(0, validateEnv_1.default)();
const app = new app_1.default([new index_route_1.default(), new commoditys_route_1.default(),
    new users_route_1.default(), new auth_route_1.default(),
    new customer_router_1.default(),
    new product_route_1.default, new addresses_route_1.default(), new commodity_types_route_1.default(), new domain_route_1.default(),
    new order_route_1.default(), new common_route_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map