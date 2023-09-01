import { Customer } from '@/interfaces/customer.interfcae';
import { Model, Optional, Sequelize } from 'sequelize';
export declare type CustomerCreationAttributes = Optional<Customer, 'customer_id'>;
export declare class CutomerModel extends Model<Customer, CustomerCreationAttributes> implements Customer {
    customer_id: number;
    customer_name: string;
    customer_email: string;
    customer_password: string;
    customer_phone: string;
    status: number;
    reset_flag: number;
}
export default function (sequelize: Sequelize): typeof CutomerModel;
