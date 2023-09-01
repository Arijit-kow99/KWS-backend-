"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemsModel = void 0;
const sequelize_1 = require("sequelize");
// Create the OrderItems model
class OrderItemsModel extends sequelize_1.Model {
}
exports.OrderItemsModel = OrderItemsModel;
// Define the model's attributes and options
function default_1(sequelize) {
    OrderItemsModel.init({
        order_items_id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        order_details_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'order_details',
                key: 'order_details_id',
            },
            allowNull: false,
        },
        commodity_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'commodity',
                key: 'commodity_id',
            },
            allowNull: false,
        },
        measurement_unit: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'order_items',
        sequelize,
    });
    return OrderItemsModel;
}
exports.default = default_1;
//# sourceMappingURL=order_item.model.js.map