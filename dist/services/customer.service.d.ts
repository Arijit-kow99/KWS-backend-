import { Customer } from '@/interfaces/customer.interfcae';
declare class CustomerService {
    customer: typeof import("../models/customer.model").CutomerModel;
    signup(userData: any): Promise<String>;
    login(userData: any): Promise<any>;
    createToken(user: Customer): string;
    changepassword(res: any): Promise<any>;
    findAllCustomer(): Promise<Customer[]>;
}
export default CustomerService;
