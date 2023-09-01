import CustomerController from '@/controllers/customer.controller';
import { Routes } from '@/interfaces/routes.interface';
declare class CustomerRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    customerController: CustomerController;
    constructor();
    private initializeRoutes;
}
export default CustomerRoute;
