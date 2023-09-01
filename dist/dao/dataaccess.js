"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
class QueryDao {
    constructor() {
        this.users = _databases_1.default.Users;
        this.sequelize = _databases_1.default.sequelize;
    }
}
exports.default = QueryDao;
//# sourceMappingURL=dataaccess.js.map