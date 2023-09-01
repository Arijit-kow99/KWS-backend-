"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("@/config");
const databases_1 = (0, tslib_1.__importDefault)(require("@/databases"));
const HttpException_1 = require("@/exceptions/HttpException");
const util_1 = require("@/utils/util");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class CustomerService {
    constructor() {
        this.customer = databases_1.default.Customers;
    }
    async signup(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, 'Invalid user Data');
        const findUser = await this.customer.findOne({ where: { customer_phone: userData.customer_phone } });
        if (findUser)
            throw new HttpException_1.HttpException(500, `Your email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.customer_password, 10);
        const createUserData = await this.customer.create(Object.assign(Object.assign({}, userData), { customer_password: hashedPassword, reset_flag: 1, status: 1 }));
        return `Your ${createUserData.customer_phone} is successfully Registerd`;
    }
    async login(userData) {
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(500, 'Invalid Credentials');
        const findUser = await this.customer.findOne({ where: { customer_phone: userData.customer_phone } });
        if (!findUser)
            throw new HttpException_1.HttpException(500, `Invalid Credentials`);
        const isPasswordMatching = await (0, bcrypt_1.compare)(userData.customer_password, findUser.customer_password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(500, 'Invalid Credentials');
        delete findUser.customer_password;
        const tokenData = this.createToken(findUser);
        return Object.assign(Object.assign({}, findUser), { token: tokenData });
    }
    createToken(user) {
        const dataStoredInToken = { id: user.customer_id };
        const secretKey = config_1.SECRET_KEY;
        const expiresIn = 60 * 120;
        return (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey);
    }
    async changepassword(res) {
        if ((0, util_1.isEmpty)(res))
            throw new HttpException_1.HttpException(500, 'Invalid Customer');
        const customerId = res.customer_id;
        if (!customerId)
            throw new HttpException_1.HttpException(500, 'Invalid Customer');
        const findcustomer = await this.customer.findByPk(customerId);
        if (!findcustomer)
            throw new HttpException_1.HttpException(500, 'Invalid Customer');
        const isPasswordMatching = await (0, bcrypt_1.compare)(res.old_password, findcustomer.customer_password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(500, 'Old Password entered is invalid');
        const hashedPassword = await (0, bcrypt_1.hash)(res.new_password, 10);
        await this.customer.update({ customer_password: hashedPassword }, { where: { customer_id: customerId } });
        return findcustomer;
    }
    ;
    async findAllCustomer() {
        const allCustomer = await this.customer.findAll();
        return allCustomer;
    }
}
exports.default = CustomerService;
//# sourceMappingURL=customer.service.js.map