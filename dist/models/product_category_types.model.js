"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryTypeModel = void 0;
const sequelize_1 = require("sequelize");
class ProductCategoryTypeModel extends sequelize_1.Model {
}
exports.ProductCategoryTypeModel = ProductCategoryTypeModel;
function default_1(sequelize) {
    ProductCategoryTypeModel.init({
        product_category_types_id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        commodity_type: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'commodity_type',
                key: 'commodity_type_id', // Replace with the actual primary key and its id
            },
        },
        product_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'product',
                key: 'product_id',
            },
        },
        allowed_items: {
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
    }, {
        tableName: 'product_category_type',
        sequelize,
    });
    return ProductCategoryTypeModel;
}
exports.default = default_1;
//# sourceMappingURL=product_category_types.model.js.map