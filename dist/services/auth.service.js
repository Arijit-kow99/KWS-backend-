"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
const loginResponse_dto_1 = require("@dtos/loginResponse.dto");
const HttpException_1 = require("@exceptions/HttpException");
const util_1 = require("@utils/util");
class AuthService {
    constructor() {
        this.users = _databases_1.default.Users;
    }
    async signup(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "Invalid user Data");
        const findUser = await this.users.findOne({ where: { email: userData.email } });
        if (findUser)
            throw new HttpException_1.HttpException(409, `Your email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return `Your ${createUserData.email} is successfully Registerd`;
    }
    async login(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(500, "Invalid Credentials");
        const findUser = await this.users.findOne({ where: { userName: userData.userid } });
        if (!findUser)
            throw new HttpException_1.HttpException(500, `Invalid Credentials`);
        const isPasswordMatching = await (0, bcrypt_1.compare)(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(500, "Invalid Credentials");
        const tokenData = this.createToken(findUser);
        // const cookie = this.createCookie(tokenData);
        const resp = new loginResponse_dto_1.LoginResponseDto(findUser.email, findUser.id, findUser.roleType, findUser.userType, tokenData.token, findUser.userName, findUser.contact);
        return { resp };
    }
    async logout(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "You're not user");
        const findUser = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "You're not a user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secretKey = _config_1.SECRET_KEY;
        const expiresIn = 60 * 120;
        return { expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map