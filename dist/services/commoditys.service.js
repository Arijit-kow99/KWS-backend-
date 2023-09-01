"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("@exceptions/HttpException");
const util_1 = require("@utils/util");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
const sequelize_1 = require("sequelize");
class CommodityService {
    constructor() {
        this.commodities = _databases_1.default.Commoditys;
        this.sequelize = _databases_1.default.sequelize;
    }
    async findAllCommodities() {
        // const allCommodities: Commodity[] = await this.commodities.findAll();
        let query = `Select * from commodity `;
        const allCommodities = await this.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        return allCommodities;
    }
    async findCommodityById(commodity_id) {
        if ((0, util_1.isEmpty)(commodity_id))
            throw new HttpException_1.HttpException(500, 'Invalid Commodity');
        const findCommodity = await this.commodities.findByPk(commodity_id);
        if (!findCommodity)
            throw new HttpException_1.HttpException(500, 'Commodity not found');
        return findCommodity;
    }
    async createCommodity(commodityData) {
        if ((0, util_1.isEmpty)(commodityData))
            throw new HttpException_1.HttpException(500, 'Invalid Commodity Data');
        const createCommodityData = await this.commodities.create(commodityData);
        return createCommodityData;
    }
    async updateCommodity(commodityId, commodityData) {
        if ((0, util_1.isEmpty)(commodityData))
            throw new HttpException_1.HttpException(500, 'Invalid Commodity Data');
        const findCommodity = await this.commodities.findByPk(commodityId);
        if (!findCommodity)
            throw new HttpException_1.HttpException(500, 'Commodity not found');
        await this.commodities.update(commodityData, { where: { commodity_id: commodityId } });
        const updatedCommodity = await this.commodities.findByPk(commodityId);
        return updatedCommodity;
    }
    async deleteCommodity(commodityId) {
        if ((0, util_1.isEmpty)(commodityId))
            throw new HttpException_1.HttpException(500, 'Invalid Commodity');
        const findCommodity = await this.commodities.findByPk(commodityId);
        if (!findCommodity)
            throw new HttpException_1.HttpException(500, 'Commodity not found');
        await this.commodities.destroy({ where: { commodity_id: commodityId } });
        return findCommodity;
    }
}
exports.default = CommodityService;
//# sourceMappingURL=commoditys.service.js.map