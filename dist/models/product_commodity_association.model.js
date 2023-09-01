"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCommodityAssociationModel = void 0;
const sequelize_1 = require("sequelize");
class ProductCommodityAssociationModel extends sequelize_1.Model {
}
exports.ProductCommodityAssociationModel = ProductCommodityAssociationModel;
function default_1(sequelize) {
    ProductCommodityAssociationModel.init({
        product_commodity_association_id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        commodity_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'commodity',
                key: 'commodity_id', // Replace with the actual primary key
            },
        },
        product_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'product',
                key: 'product_id', // Replace with the actual primary key
            },
        },
        product_category_types_id: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: 'product_category_type',
                key: 'product_category_types_id', // Replace with the actual primary key
            },
        },
        measurement_unit: {
            type: sequelize_1.DataTypes.STRING, // Update with appropriate length if needed
        },
        quantity: {
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
        tableName: 'product_commodity_association',
        sequelize,
    });
    return ProductCommodityAssociationModel;
}
exports.default = default_1;
//# sourceMappingURL=product_commodity_association.model.js.map