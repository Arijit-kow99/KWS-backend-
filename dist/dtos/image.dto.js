"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImageDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateImageDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateImageDto.prototype, "image_type", void 0);
exports.CreateImageDto = CreateImageDto;
//# sourceMappingURL=image.dto.js.map