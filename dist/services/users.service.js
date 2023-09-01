"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
const HttpException_1 = require("@exceptions/HttpException");
const util_1 = require("@utils/util");
class UserService {
    constructor() {
        this.users = _databases_1.default.Users;
    }
    async findAllUser() {
        const allUser = await this.users.findAll();
        return allUser;
    }
    async findUserById(userId) {
        if ((0, util_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const findUser = await this.users.findByPk(userId);
        if (!findUser)
            throw new HttpException_1.HttpException(500, 'Invalid User');
        return findUser;
    }
    async createUser(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const findUser = await this.users.findOne({ where: { email: userData.email } });
        if (findUser)
            throw new HttpException_1.HttpException(500, `Your email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async updateUser(userId, userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const findUser = await this.users.findByPk(userId);
        if (!findUser)
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        await this.users.update(Object.assign(Object.assign({}, userData), { password: hashedPassword }), { where: { id: userId } });
        const updateUser = await this.users.findByPk(userId);
        return updateUser;
    }
    async deleteUser(userId) {
        if ((0, util_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const findUser = await this.users.findByPk(userId);
        if (!findUser)
            throw new HttpException_1.HttpException(500, 'Invalid User');
        await this.users.destroy({ where: { id: userId } });
        return findUser;
    }
    async changepassword(res) {
        if ((0, util_1.isEmpty)(res))
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const findUser = await this.users.findByPk(res.userid);
        if (!findUser)
            throw new HttpException_1.HttpException(500, 'Invalid User');
        const isPasswordMatching = await (0, bcrypt_1.compare)(res.old_password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(500, 'Invalid Old Password');
        const hashedPassword = await (0, bcrypt_1.hash)(res.new_password, 10);
        await this.users.update(Object.assign(Object.assign({}, findUser), { password: hashedPassword }), { where: { id: findUser.id } });
        return findUser;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map