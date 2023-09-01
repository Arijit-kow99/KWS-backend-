"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
class ProductModel extends sequelize_1.Model {
}
exports.ProductModel = ProductModel;
function default_1(sequelize) {
    ProductModel.init({
        product_id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: sequelize_1.DataTypes.STRING(120),
        },
        product_desc: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        image_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'image',
                key: 'image_id',
            },
        },
        max_allowed_items: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        status: {
            type: sequelize_1.DataTypes.TINYINT,
        },
        created_on: {
            type: sequelize_1.DataTypes.DATE,
        },
        created_by: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        updated_on: {
            type: sequelize_1.DataTypes.DATE,
        },
        updated_by: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        product_code: {
            type: sequelize_1.DataTypes.STRING(30),
        },
    }, {
        tableName: 'product',
        sequelize,
        indexes: [
            // Create a unique index on product_code
            {
                unique: true,
                fields: ['product_code'],
            },
        ],
    });
    return ProductModel;
}
exports.default = default_1;
//# sourceMappingURL=product.model.js.map