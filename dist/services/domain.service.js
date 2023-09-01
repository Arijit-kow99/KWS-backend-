"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
class DomainService {
    constructor() {
        this.domain = _databases_1.default.Domain;
    }
    async findAllDomain() {
        // if (isEmpty(domain_type)) throw new HttpException(500,'Invalid Request');
        const alldomain = await this.domain.findAll();
        return alldomain;
    }
}
exports.default = DomainService;
//# sourceMappingURL=domain.service.js.map