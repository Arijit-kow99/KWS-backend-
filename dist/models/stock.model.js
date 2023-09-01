"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the Stock
class StockModel extends sequelize_1.Model {
}
exports.StockModel = StockModel;
// Define the initialization function for the Stock model
function default_1(sequelize) {
    StockModel.init({
        product_price_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        product_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.BIGINT,
        },
        mrp: {
            allowNull: false,
            type: sequelize_1.DataTypes.FLOAT,
        },
        selling_price: {
            allowNull: false,
            type: sequelize_1.DataTypes.FLOAT,
        },
        quantity: {
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
        effective_on: {
            allowNull: true,
            type: sequelize_1.DataTypes.DATE, // Add this field definition
        },
    }, {
        tableName: 'stock',
        sequelize,
    });
    return StockModel;
}
exports.default = default_1;
//# sourceMappingURL=stock.model.js.map