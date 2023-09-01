import { Address } from '@interfaces/addresses.interface';
declare class AddressService {
    addresses: typeof import("../models/addresses.model").AddressModel;
    findAllAddresses(): Promise<Address[]>;
    findAddressById(addressId: number): Promise<Address>;
    getAddressByCustId(customer_id: string): Promise<any>;
    createAddress(addressData: any): Promise<Address>;
    updateAddress(addressId: number, addressData: any): Promise<Address>;
    deleteAddress(addressId: number): Promise<Address>;
}
export default AddressService;
