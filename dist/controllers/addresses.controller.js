"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const addresses_service_1 = (0, tslib_1.__importDefault)(require("@services/addresses.service"));
class AddressController {
    constructor() {
        this.addressService = new addresses_service_1.default();
        this.getAddresses = async (req, res, next) => {
            try {
                const findAllAddressesData = await this.addressService.findAllAddresses();
                console.log(findAllAddressesData);
                res.status(200).json(findAllAddressesData);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAddressById = async (req, res, next) => {
            try {
                const addressId = Number(req.params.id);
                const findAllAddressesData = await this.addressService.findAddressById(addressId);
                res.status(200).json(findAllAddressesData);
            }
            catch (error) {
                next(error);
            }
        };
        this.createAddress = async (req, res, next) => {
            try {
                const addressData = req.body;
                const createAddressData = await this.addressService.createAddress(addressData);
                console.log(createAddressData);
                res.status(200).json({ message: 'Address successfully created id:' + createAddressData.address_id });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateAddress = async (req, res, next) => {
            try {
                const addressId = Number(req.params.id);
                const addressData = req.body;
                const updateAddressData = await this.addressService.updateAddress(addressId, addressData);
                res.status(200).json({ message: 'Address successfully updated' + updateAddressData.address_id });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteAddress = async (req, res, next) => {
            try {
                const addressId = Number(req.params.id);
                const deleteAddressData = await this.addressService.deleteAddress(addressId);
                res.status(200).json({ message: 'Address deleted', data: deleteAddressData });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAddressByCustId = async (req, res, next) => {
            try {
                const customer_id = String(req.params.customer_id);
                const addresses = await this.addressService.getAddressByCustId(customer_id);
                // Check if there are any addresses retrieved
                if (addresses && addresses.length > 0) {
                    const singleAddress = addresses[0]; // Select the first address
                    res.status(200).json(singleAddress);
                }
                else {
                    res.status(404).json({ message: "Address not found" });
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AddressController;
//# sourceMappingURL=addresses.controller.js.map