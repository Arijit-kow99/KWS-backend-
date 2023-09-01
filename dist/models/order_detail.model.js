"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the OrderDetail
class OrderDetailModel extends sequelize_1.Model {
}
exports.OrderDetailModel = OrderDetailModel;
// Define the initialization function for the OrderDetail model
function default_1(sequelize) {
    OrderDetailModel.init({
        order_details_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        product_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        product_type: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        order_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        quantity: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
        },
        unit_price: {
            allowNull: false,
            type: sequelize_1.DataTypes.FLOAT,
        },
        sub_total_price: {
            allowNull: false,
            type: sequelize_1.DataTypes.FLOAT,
        },
    }, {
        tableName: 'order_details',
        sequelize,
    });
    return OrderDetailModel;
}
exports.default = default_1;
//# sourceMappingURL=order_detail.model.js.map