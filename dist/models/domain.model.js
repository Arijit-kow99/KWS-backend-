"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModel = void 0;
const sequelize_1 = require("sequelize");
class DomainModel extends sequelize_1.Model {
}
exports.DomainModel = DomainModel;
// Define the initialization function for the Domain model
function default_1(sequelize) {
    DomainModel.init({
        domain_id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
        },
        domain_code: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(30),
        },
        domain_value: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(30),
        },
        domain_text: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(125),
        },
        domain_type: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(120), // Adjust the data type and length as needed
        },
    }, {
        tableName: 'domain',
        sequelize,
    });
    return DomainModel;
}
exports.default = default_1;
//# sourceMappingURL=domain.model.js.map