import AddressController from '@controllers/addresses.controller';
import { Routes } from '@interfaces/routes.interface';
declare class AddressRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    addressController: AddressController;
    constructor();
    private initializeRoutes;
}
export default AddressRoute;
