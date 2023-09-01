"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommodityDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCommodityDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCommodityDto.prototype, "commodity_name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityDto.prototype, "commodity_type_id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityDto.prototype, "image_id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityDto.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsDate)(),
    (0, tslib_1.__metadata)("design:type", Date)
], CreateCommodityDto.prototype, "created_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityDto.prototype, "created_by", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsDate)(),
    (0, tslib_1.__metadata)("design:type", Date)
], CreateCommodityDto.prototype, "updated_on", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateCommodityDto.prototype, "updated_by", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCommodityDto.prototype, "commodity_code", void 0);
exports.CreateCommodityDto = CreateCommodityDto;
//# sourceMappingURL=commoditys.dto.js.map