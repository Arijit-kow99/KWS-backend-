"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const sequelize_1 = require("sequelize");
class AddressModel extends sequelize_1.Model {
}
exports.AddressModel = AddressModel;
function default_1(sequelize) {
    AddressModel.init({
        address_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        house_no: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
        address_line1: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
        address_line2: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        // flat_no: {
        //   type: DataTypes.STRING(255),
        // },
        // block_no: {
        //   type: DataTypes.STRING(255),
        // },
        // society: {
        //   type: DataTypes.STRING(255),
        // },
        city: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(60),
        },
        state: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(20),
        },
        country: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(20),
        },
        pin: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(10),
        },
        status: {
            allowNull: true,
            type: sequelize_1.DataTypes.TINYINT,
        },
        customer_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'Customer',
                key: 'customer_id',
            },
        },
    }, {
        tableName: 'address',
        sequelize,
    });
    return AddressModel;
}
exports.default = default_1;
//# sourceMappingURL=addresses.model.js.map