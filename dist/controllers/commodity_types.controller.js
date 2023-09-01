"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commodity_types_service_1 = (0, tslib_1.__importDefault)(require("@services/commodity_types.service"));
class CommodityTypeController {
    constructor() {
        this.commodityTypeService = new commodity_types_service_1.default();
        this.getCommodityTypes = async (req, res, next) => {
            try {
                const findAllCommodityTypesData = await this.commodityTypeService.findAllCommodityTypes();
                res.status(200).json(findAllCommodityTypesData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCommodityTypeById = async (req, res, next) => {
            try {
                const commodityTypeId = Number(req.params.id);
                const findCommodityTypeData = await this.commodityTypeService.findCommodityTypeById(commodityTypeId);
                res.status(200).json(findCommodityTypeData);
            }
            catch (error) {
                next(error);
            }
        };
        this.createCommodityType = async (req, res, next) => {
            try {
                const commodityTypeData = req.body;
                const createCommodityTypeData = await this.commodityTypeService.createCommodityType(commodityTypeData);
                console.log(req.body);
                res.status(201).json({ message: 'CommodityType successfully created id: ' + createCommodityTypeData.commodity_type_id });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.updateCommodityType = async (req, res, next) => {
            try {
                const commodityTypeId = Number(req.params.id);
                const commodityTypeData = req.body;
                const updateCommodityTypeData = await this.commodityTypeService.updateCommodityType(commodityTypeId, commodityTypeData);
                res.status(200).json({ message: 'CommodityType successfully updated for ' + updateCommodityTypeData.commodity_type_id });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.deleteCommodityType = async (req, res, next) => {
            try {
                const commodityTypeId = Number(req.params.id);
                const deleteCommodityTypeData = await this.commodityTypeService.deleteCommodityType(commodityTypeId);
                res.status(200).json({ message: 'CommodityType deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CommodityTypeController;
//# sourceMappingURL=commodity_types.controller.js.map