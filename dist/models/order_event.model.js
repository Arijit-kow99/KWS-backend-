"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEventModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the OrderEvent
class OrderEventModel extends sequelize_1.Model {
}
exports.OrderEventModel = OrderEventModel;
// Define the initialization function for the OrderEvent model
function default_1(sequelize) {
    OrderEventModel.init({
        order_event_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        order_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        status: {
            allowNull: true,
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
    }, {
        tableName: 'order_event',
        sequelize,
    });
    return OrderEventModel;
}
exports.default = default_1;
//# sourceMappingURL=order_event.model.js.map