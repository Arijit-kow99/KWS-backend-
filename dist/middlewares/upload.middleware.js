"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
const uploadMiddleware = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.default = uploadMiddleware;
//# sourceMappingURL=upload.middleware.js.map