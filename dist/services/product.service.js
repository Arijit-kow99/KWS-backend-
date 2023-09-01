"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases")); // Adjust the import path accordingly
const HttpException_1 = require("@exceptions/HttpException");
const util_1 = require("@utils/util");
class ProductService {
    constructor() {
        this.products = _databases_1.default.Products; // Use the appropriate database model for products
        this.connection = _databases_1.default.sequelize;
    }
    async findAllProducts() {
        const allProducts = await this.products.findAll();
        return allProducts;
    }
    async findProductById(productId) {
        if ((0, util_1.isEmpty)(productId))
            throw new HttpException_1.HttpException(500, 'Invalid Product');
        const findProduct = await this.products.findByPk(productId);
        if (!findProduct)
            throw new HttpException_1.HttpException(500, 'Invalid Product');
        return findProduct;
    }
    async createProduct(productData) {
        if ((0, util_1.isEmpty)(productData))
            throw new HttpException_1.HttpException(500, 'Invalid Product');
        const createProductData = await this.products.create(productData);
        return createProductData;
    }
    async updateProduct(productId, productData) {
        if ((0, util_1.isEmpty)(productData))
            throw new HttpException_1.HttpException(400, 'Product data cannot be empty');
        const foundProduct = await this.products.findByPk(productId);
        if (!foundProduct)
            throw new HttpException_1.HttpException(404, 'Product not found');
        await this.products.update(productData, { where: { product_id: productId } });
        const updatedProduct = await this.products.findByPk(productId);
        return updatedProduct;
    }
    async getProductInfo(productId) {
        const productSelectQuery = `
  SELECT * FROM product
  WHERE product_id = ?
`;
        const [productData] = await this.connection.query(productSelectQuery, { replacements: [productId] });
        if (!productData.length) {
            throw new Error("Product not found");
        }
        const commodityTypeSelectQuery = `
  SELECT pct.*,ct.commodity_type_name FROM product_category_types pct,commodity_type ct
  WHERE ct.commodity_type_id=pct.commodity_type_id and product_id = ?
`;
        const [commodityTypes] = await this.connection.query(commodityTypeSelectQuery, { replacements: [productId] });
        console.log(commodityTypes);
        const productInfo = {
            product_name: productData[0].product_name,
            product_desc: productData[0].product_desc,
            max_allowed_items: productData[0].max_allowed_items,
            comodity_item: []
        };
        for (const commodityType of commodityTypes) {
            const commoditySelectQuery = `
      SELECT pca.*,commodity_name  FROM product_commodity_association pca,commodity c
      WHERE c.commodity_id=pca.commodity_id and product_category_types_id in(?) and product_id in(?)
    `;
            const [commodities] = await this.connection.query(commoditySelectQuery, {
                replacements: [
                    commodityType.product_category_types_id,
                    commodityType.product_id
                ]
            });
            const comodityItem = {
                commodity_type_id: commodityType.commodity_type_id,
                commodity_type_name: commodityType.commodity_type_name,
                allowed_items: commodityType.allowed_items,
                commodities: commodities.map((commodity) => ({
                    commodity_id: commodity.commodity_id,
                    commodity_name: commodity.commodity_name,
                    quantity: commodity.quantity,
                    measurement_unit: commodity.measurement_unit
                }))
            };
            productInfo.comodity_item.push(comodityItem);
        }
        return productInfo;
    }
    async getCommoditiesByType() {
        try {
            const query = `
      SELECT ct.commodity_type_name, c.commodity_name
      FROM commodity c, commodity_type ct
      WHERE c.commodity_type_id = ct.commodity_type_id
    `;
            const [results] = await this.connection.query(query, { raw: true, });
            const structuredData = {};
            for (const result of results) {
                if (!structuredData[result.commodity_type_name]) {
                    structuredData[result.commodity_type_name] = [];
                }
                structuredData[result.commodity_type_name].push(result.commodity_name);
            }
            return structuredData;
        }
        catch (error) {
            throw error;
        }
    }
    async getProductByStoke() {
        try {
            const query = `
      SELECT DISTINCT product_name, mrp, selling_price, quantity, effective_date
      FROM stock s
      JOIN product p ON s.product_id = p.product_id;
      
    `;
            const results = await this.connection.query(query, { mapToModel: true, model: this.products });
            return results;
        }
        catch (error) {
            throw error;
        }
    }
    async insertOrderData(jsonData) {
        console.log("insert", jsonData.product_name);
        const productInsertQuery = `
    INSERT INTO product (product_name, product_desc, max_allowed_items)
    VALUES (?, ?, ?)
  `;
        const [productId] = await this.connection.query(productInsertQuery, {
            replacements: [
                jsonData.product_name,
                jsonData.product_desc,
                jsonData.max_allowed_items,
            ],
        });
        console.log("Productid.......", productId);
        for (const commodityType of jsonData.comodity_item) {
            const commodityTypeInsertQuery = `
      INSERT INTO product_category_types(commodity_type_id, allowed_items, product_id)
      VALUES (?, ?, ?)
    `;
            const [commodityTypeId] = await this.connection.query(commodityTypeInsertQuery, {
                replacements: [
                    commodityType.commodity_type_id,
                    commodityType.allowed_items,
                    productId,
                ],
            });
            console.log("commodityTypeId.......", commodityTypeId);
            for (const commodity of commodityType.commodities) {
                console.log("commodity.......", commodity);
                const commodityInsertQuery = `
        INSERT INTO product_commodity_association (commodity_id, product_id, quantity, measurement_unit, product_category_types_id)
        VALUES (?, ?, ?, ?, ?)
      `;
                await this.connection.query(commodityInsertQuery, {
                    replacements: [
                        commodity.commodity_id,
                        productId,
                        commodity.quantity,
                        commodity.measurement_unit,
                        commodityTypeId,
                    ],
                });
            }
        }
        console.log("Data inserted successfully");
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map