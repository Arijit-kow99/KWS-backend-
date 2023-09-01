"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("@utils/util");
const HttpException_1 = require("@exceptions/HttpException");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
class CommodityTypeService {
    constructor() {
        this.commodityTypes = _databases_1.default.commodityTypes;
    }
    async findAllCommodityTypes() {
        const allCommodityTypes = await this.commodityTypes.findAll();
        return allCommodityTypes;
    }
    async findCommodityTypeById(commodityTypeId) {
        if ((0, util_1.isEmpty)(commodityTypeId))
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        const findCommodityType = await this.commodityTypes.findByPk(commodityTypeId);
        if (!findCommodityType)
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        return findCommodityType;
    }
    async createCommodityType(commodityTypeData) {
        if ((0, util_1.isEmpty)(commodityTypeData))
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        const createCommodityTypeData = await this.commodityTypes.create(commodityTypeData);
        return createCommodityTypeData;
    }
    async updateCommodityType(commodityTypeId, commodityTypeData) {
        if ((0, util_1.isEmpty)(commodityTypeData))
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        const findCommodityType = await this.commodityTypes.findByPk(commodityTypeId);
        if (!findCommodityType)
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        await this.commodityTypes.update(commodityTypeData, { where: { commodity_type_id: commodityTypeId } });
        const updateCommodityTypeData = await this.commodityTypes.findByPk(commodityTypeId);
        return updateCommodityTypeData;
    }
    async deleteCommodityType(commodityTypeId) {
        if ((0, util_1.isEmpty)(commodityTypeId))
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        const findCommodityType = await this.commodityTypes.findByPk(commodityTypeId);
        if (!findCommodityType)
            throw new HttpException_1.HttpException(500, 'Invalid CommodityType');
        await this.commodityTypes.destroy({ where: { commodity_type_id: commodityTypeId } });
        return findCommodityType;
    }
}
exports.default = CommodityTypeService;
//# sourceMappingURL=commodity_types.service.js.map