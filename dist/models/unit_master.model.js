"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitMasterModel = void 0;
// Import necessary modules
const sequelize_1 = require("sequelize");
// Define the Sequelize model for the UnitMaster
class UnitMasterModel extends sequelize_1.Model {
}
exports.UnitMasterModel = UnitMasterModel;
// Define the initialization function for the UnitMaster model
function default_1(sequelize) {
    UnitMasterModel.init({
        unit_master_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        unit_name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(30),
        },
    }, {
        tableName: 'unit_master',
        sequelize,
    });
    return UnitMasterModel;
}
exports.default = default_1;
//# sourceMappingURL=unit_master.model.js.map