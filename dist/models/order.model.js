"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const sequelize_1 = require("sequelize");
class OrderModel extends sequelize_1.Model {
}
exports.OrderModel = OrderModel;
function default_1(sequelize) {
    OrderModel.init({
        order_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        order_code: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(30),
        },
        payment_status: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        payment_mode: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        txn_ref_no: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(255),
        },
        payment_date: {
            allowNull: true,
            type: sequelize_1.DataTypes.DATE,
        },
        customer_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        address_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        expected_delivery_date: {
            type: sequelize_1.DataTypes.DATE,
        },
        status: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
        },
        created_on: {
            allowNull: true,
            type: sequelize_1.DataTypes.DATE,
        },
        created_by: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        updated_on: {
            allowNull: true,
            type: sequelize_1.DataTypes.DATE,
        },
        updated_by: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        total_price: {
            allowNull: true,
            type: sequelize_1.DataTypes.FLOAT,
        },
    }, {
        tableName: 'order',
        sequelize,
    });
    return OrderModel;
}
exports.default = default_1;
//# sourceMappingURL=order.model.js.map