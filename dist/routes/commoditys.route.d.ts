import CommodityController from '@controllers/commoditys.controller';
import { Routes } from '@interfaces/routes.interface';
declare class CommoditysRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    commoditysController: CommodityController;
    constructor();
    private initializeRoutes;
}
export default CommoditysRoute;
