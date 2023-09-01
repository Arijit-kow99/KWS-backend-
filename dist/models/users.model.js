"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
function default_1(sequelize) {
    UserModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
            field: 'userid',
        },
        email: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(45),
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
        userType: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(50)
        },
        roleType: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(50)
        },
        userName: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(100)
        },
        contact: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(100)
        },
    }, {
        tableName: 'users',
        sequelize,
    });
    return UserModel;
}
exports.default = default_1;
//# sourceMappingURL=users.model.js.map