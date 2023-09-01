export interface Customer {
    customer_id: number;
    customer_name: string;
    customer_email: string;
    customer_password: string;
    customer_phone: string;
    status: number;
    reset_flag: number;
}
export interface TokenData {
    token: string;
    expiresIn: number;
}
export interface DataStoredInToken {
    id: number;
}
