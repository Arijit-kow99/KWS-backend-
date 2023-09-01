"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutomerModel = void 0;
const sequelize_1 = require("sequelize");
class CutomerModel extends sequelize_1.Model {
}
exports.CutomerModel = CutomerModel;
function default_1(sequelize) {
    CutomerModel.init({
        customer_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        customer_email: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(45),
        },
        customer_password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
        customer_name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(50),
        },
        customer_phone: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(50),
        },
        reset_flag: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(100),
            defaultValue: 1,
        },
        status: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(100),
            defaultValue: 1,
        },
    }, {
        tableName: 'customer',
        sequelize,
    });
    return CutomerModel;
}
exports.default = default_1;
//# sourceMappingURL=customer.model.js.map