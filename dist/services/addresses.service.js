"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
const HttpException_1 = require("@exceptions/HttpException");
const util_1 = require("@utils/util");
class AddressService {
    constructor() {
        this.addresses = _databases_1.default.Addresses;
    }
    async findAllAddresses() {
        const allAddresses = await this.addresses.findAll();
        return allAddresses;
    }
    async findAddressById(addressId) {
        if ((0, util_1.isEmpty)(addressId))
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        const findAddress = await this.addresses.findByPk(addressId);
        if (!findAddress)
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        return findAddress;
    }
    async getAddressByCustId(customer_id) {
        let r;
        try {
            const query = `
                                select  * 
                          from kws.address
                          where customer_id =?;
      `;
            const results = await _databases_1.default.sequelize.query(query, {
                replacements: [customer_id],
                plain: false
            });
            r = results;
        }
        catch (error) {
            console.error('Error executing raw SQL query:', error);
        }
        return r;
    }
    async createAddress(addressData) {
        if ((0, util_1.isEmpty)(addressData)) {
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        }
        const createAddressData = await this.addresses.create(addressData);
        return createAddressData;
    }
    async updateAddress(addressId, addressData) {
        if ((0, util_1.isEmpty)(addressData))
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        const findAddress = await this.addresses.findByPk(addressId);
        if (!findAddress)
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        await this.addresses.update(addressData, { where: { address_id: addressId } });
        const updatedAddress = await this.addresses.findByPk(addressId);
        return updatedAddress;
    }
    async deleteAddress(addressId) {
        if ((0, util_1.isEmpty)(addressId))
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        const findAddress = await this.addresses.findByPk(addressId);
        if (!findAddress)
            throw new HttpException_1.HttpException(500, 'Invalid Address');
        await this.addresses.update({ status: 0 }, { where: { address_id: addressId } });
        return findAddress;
    }
}
exports.default = AddressService;
//# sourceMappingURL=addresses.service.js.map