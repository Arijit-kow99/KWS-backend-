"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommodityTypeDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCommodityTypeDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCommodityTypeDto.prototype, "commodity_type_name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityTypeDto.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCommodityTypeDto.prototype, "created_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityTypeDto.prototype, "created_by", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCommodityTypeDto.prototype, "updated_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityTypeDto.prototype, "updated_by", void 0);
exports.CreateCommodityTypeDto = CreateCommodityTypeDto;
//# sourceMappingURL=commodity_types.dto.js.map