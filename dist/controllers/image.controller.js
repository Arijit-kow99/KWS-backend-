"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const image_service_1 = (0, tslib_1.__importDefault)(require("@services/image.service"));
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
const upload = (0, multer_1.default)();
class ImageController {
    constructor() {
        this.imageService = new image_service_1.default();
        this.getImageById = async (req, res, next) => {
            const imageId = parseInt(req.params.id, 10);
            try {
                const imageBlob = await this.imageService.getImageDataById(imageId);
                if (imageBlob) {
                    res.setHeader('Content-Type', 'image/jpeg');
                    res.send(imageBlob);
                }
                else {
                    res.status(404).send('Image not found');
                }
            }
            catch (error) {
                console.error('Error retrieving image:', error);
                res.status(500).send('Internal server error');
            }
        };
        this.uploadImage = async (req, res, next) => {
            try {
                const imageBuffer = req.body.image;
                console.log(imageBuffer);
                if (!imageBuffer) {
                    return res.status(400).json({ error: 'No image data uploaded' });
                }
                const insertedImageId = await this.imageService.insertImage(imageBuffer);
                return res.status(200).json({ message: 'Image inserted successfully', imageId: insertedImageId });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
}
exports.default = ImageController;
//# sourceMappingURL=image.controller.js.map