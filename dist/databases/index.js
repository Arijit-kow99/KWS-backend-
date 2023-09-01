"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = (0, tslib_1.__importDefault)(require("sequelize"));
const _config_1 = require("@config");
const users_model_1 = (0, tslib_1.__importDefault)(require("@models/users.model"));
const logger_1 = require("@utils/logger");
const commodity_model_1 = (0, tslib_1.__importDefault)(require("@/models/commodity.model"));
const image_model_1 = (0, tslib_1.__importDefault)(require("@/models/image.model"));
const product_commodity_association_model_1 = (0, tslib_1.__importDefault)(require("@/models/product_commodity_association.model"));
const product_category_types_model_1 = (0, tslib_1.__importDefault)(require("@/models/product_category_types.model"));
const product_model_1 = (0, tslib_1.__importDefault)(require("@/models/product.model"));
const customer_model_1 = (0, tslib_1.__importDefault)(require("@/models/customer.model"));
const addresses_model_1 = (0, tslib_1.__importDefault)(require("@/models/addresses.model"));
const commodity_type_model_1 = (0, tslib_1.__importDefault)(require("@/models/commodity_type.model"));
const order_model_1 = (0, tslib_1.__importDefault)(require("@/models/order.model"));
const order_item_model_1 = (0, tslib_1.__importDefault)(require("@/models/order_item.model"));
const order_event_model_1 = (0, tslib_1.__importDefault)(require("@/models/order_event.model"));
const order_detail_model_1 = (0, tslib_1.__importDefault)(require("@/models/order_detail.model"));
const sequelize = new sequelize_1.default.Sequelize(_config_1.DB_DATABASE, _config_1.DB_USER, _config_1.DB_PASSWORD, {
    dialect: 'mysql',
    host: _config_1.DB_HOST,
    port: +_config_1.DB_PORT,
    timezone: '+05:30',
    query: { raw: true },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // If don't want createdAt
        createdAt: false,
        // If don't want updatedAt
        updatedAt: false,
    },
    pool: {
        min: 0,
        max: 5,
    },
    logQueryParameters: _config_1.NODE_ENV === 'development',
    logging: (query, time) => {
        logger_1.logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
});
sequelize.authenticate();
const DB = {
    Users: (0, users_model_1.default)(sequelize),
    Products: (0, product_model_1.default)(sequelize),
    Product_Commoditys: (0, product_commodity_association_model_1.default)(sequelize),
    Product_Category_Types: (0, product_category_types_model_1.default)(sequelize),
    Images: (0, image_model_1.default)(sequelize),
    Commoditys: (0, commodity_model_1.default)(sequelize),
    Customers: (0, customer_model_1.default)(sequelize),
    Addresses: (0, addresses_model_1.default)(sequelize),
    commodityTypes: (0, commodity_type_model_1.default)(sequelize),
    Order: (0, order_model_1.default)(sequelize),
    Order_Detail: (0, order_detail_model_1.default)(sequelize),
    Order_Item: (0, order_event_model_1.default)(sequelize),
    Order_Event: (0, order_item_model_1.default)(sequelize),
    sequelize,
    Sequelize: // connection instance (RAW queries)
    sequelize_1.default, // library
};
exports.default = DB;
//# sourceMappingURL=index.js.map