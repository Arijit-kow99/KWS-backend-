"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateProductDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProductDto.prototype, "product_name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProductDto.prototype, "product_desc", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateProductDto.prototype, "image_id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateProductDto.prototype, "max_allowed_items", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateProductDto.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProductDto.prototype, "created_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateProductDto.prototype, "created_by", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProductDto.prototype, "updated_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateProductDto.prototype, "updated_by", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProductDto.prototype, "product_code", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=product.dto.js.map