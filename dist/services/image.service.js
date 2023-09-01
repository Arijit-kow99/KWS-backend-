"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases")); // Adjust the import path accordingly
class ImageService {
    constructor() {
        this.products = _databases_1.default.Products; // Use the appropriate database model for products
        this.connection = _databases_1.default.sequelize;
    }
    async getImageDataById(imageId) {
        try {
            const queryResult = await this.connection.query(`SELECT image_data FROM image WHERE id = ${imageId}`);
            if (queryResult && queryResult[0] && queryResult[0][0]) {
                return queryResult[0][0].image_data;
            }
            return null;
        }
        catch (error) {
            console.error('Error retrieving image:', error);
            throw new Error('Internal server error');
        }
    }
    async insertImage(imageBuffer) {
        try {
            const result = await this.connection.query('INSERT INTO image ( image_data) VALUES ( ?)', { replacements: [imageBuffer] });
            return result[0];
        }
        catch (error) {
            console.error('Error inserting image:', error);
            throw new Error('Internal server error');
        }
    }
}
exports.default = ImageService;
//# sourceMappingURL=image.service.js.map