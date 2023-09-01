import { Sequelize, Model, Optional } from 'sequelize';
import { Address } from '@interfaces/addresses.interface';
export declare type AddressAttributes = Optional<Address, 'address_id' | 'status'>;
export declare class AddressModel extends Model<Address, AddressAttributes> implements Address {
    address_id: number;
    house_no: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    status: null;
    customer_id: number;
    createdAt: Date;
    updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof AddressModel;
