"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModel = void 0;
const sequelize_1 = require("sequelize");
class imageModel extends sequelize_1.Model {
}
exports.imageModel = imageModel;
function default_1(sequelize) {
    imageModel.init({
        image_id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        image_type: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        image_data: {
            type: sequelize_1.DataTypes.BLOB,
        },
    }, {
        tableName: 'image',
        sequelize,
    });
    return imageModel;
}
exports.default = default_1;
//# sourceMappingURL=image.model.js.map