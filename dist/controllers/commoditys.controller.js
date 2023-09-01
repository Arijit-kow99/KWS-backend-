"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commoditys_service_1 = (0, tslib_1.__importDefault)(require("@/services/commoditys.service"));
class CommodityController {
    constructor() {
        this.CommodityService = new commoditys_service_1.default();
        this.getCommodities = async (req, res, next) => {
            try {
                const findAllCommoditiesData = await this.CommodityService.findAllCommodities();
                res.status(200).json(findAllCommoditiesData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCommoditiesById = async (req, res, next) => {
            try {
                const commodityId = Number(req.params.commodity_id);
                const findonecommoditydata = await this.CommodityService.findCommodityById(commodityId);
                res.status(200).json(findonecommoditydata);
            }
            catch (error) {
                next(error);
            }
        };
        this.createCommodity = async (req, res, next) => {
            try {
                const commodityData = req.body;
                const createcommodityData = await this.CommodityService.createCommodity(commodityData);
                res.status(201).json({ message: 'Commodity created succesfully created id:' + createcommodityData.commodity_id });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCommodity = async (req, res, next) => {
            try {
                const commodityId = Number(req.params.id);
                const commodityData = req.body;
                const updatecommodityData = await this.CommodityService.updateCommodity(commodityId, commodityData);
                res.status(200).json({ message: 'User successfully updated for ' + updatecommodityData.commodity_id });
            }
            catch (error) {
                next(error);
            }
        };
        this.deletecommodity = async (req, res, next) => {
            try {
                const commodityId = Number(req.params.id);
                const deletecommodityData = await this.CommodityService.deleteCommodity(commodityId);
                res.status(200).json({ message: 'Commod deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CommodityController;
//# sourceMappingURL=commoditys.controller.js.map