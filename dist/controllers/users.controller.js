"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_service_1 = (0, tslib_1.__importDefault)(require("@services/users.service"));
class UsersController {
    constructor() {
        this.userService = new users_service_1.default();
        this.getUsers = async (req, res, next) => {
            try {
                const findAllUsersData = await this.userService.findAllUser();
                res.status(200).json(findAllUsersData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.userService.findUserById(userId);
                res.status(200).json(findOneUserData);
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const userData = req.body;
                const createUserData = await this.userService.createUser(userData);
                res.status(201).json({ message: 'User successfully created id: ' + createUserData.id });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.userService.updateUser(userId, userData);
                res.status(200).json({ message: 'User successfully updated for ' + updateUserData.id });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.userService.deleteUser(userId);
                res.status(200).json({ message: 'User deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.changepassword = async (req, res, next) => {
            try {
                const reqs = req.body;
                const deleteUserData = await this.userService.changepassword(reqs);
                res.status(200).json({ message: 'password changed' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map