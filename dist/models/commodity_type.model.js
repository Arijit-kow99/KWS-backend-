"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityTypeModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the CommodityType
class CommodityTypeModel extends sequelize_1.Model {
}
exports.CommodityTypeModel = CommodityTypeModel;
// Define the initialization function for the CommodityType model
function default_1(sequelize) {
    CommodityTypeModel.init({
        commodity_type_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        commodity_type_name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
        status: {
            allowNull: false,
            type: sequelize_1.DataTypes.TINYINT,
            defaultValue: 1,
        },
        created_on: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        created_by: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
        },
        updated_on: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        updated_by: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, {
        tableName: 'commodity_type',
        sequelize,
    });
    return CommodityTypeModel;
}
exports.default = default_1;
//# sourceMappingURL=commodity_type.model.js.map