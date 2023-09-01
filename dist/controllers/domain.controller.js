"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const domain_service_1 = (0, tslib_1.__importDefault)(require("@/services/domain.service"));
class domainController {
    constructor() {
        this.DomainService = new domain_service_1.default();
        this.getdomain = async (req, res, next) => {
            try {
                const domain_type = String(req.params.type);
                const findAlldomainData = await this.DomainService.findAllDomain();
                res.status(200).json(findAlldomainData);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = domainController;
//# sourceMappingURL=domain.controller.js.map