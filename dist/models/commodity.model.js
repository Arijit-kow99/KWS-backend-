"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the Commodity
class CommodityModel extends sequelize_1.Model {
}
exports.CommodityModel = CommodityModel;
// Define the initialization function for the Commodity model
function default_1(sequelize) {
    CommodityModel.init({
        commodity_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        commodity_name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
            unique: true,
        },
        commodity_type_id: {
            allowNull: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        image_id: {
            allowNull: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        status: {
            allowNull: true,
            type: sequelize_1.DataTypes.TINYINT,
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
        commodity_code: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(30),
            unique: true,
        },
    }, {
        tableName: 'commodity',
        sequelize,
    });
    return CommodityModel;
}
exports.default = default_1;
//# sourceMappingURL=commodity.model.js.map