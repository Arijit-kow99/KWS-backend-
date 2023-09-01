import CommodityTypeController from '@controllers/commodity_types.controller';
import { Routes } from '@interfaces/routes.interface';
declare class CommodityTypeRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    commodityTypeController: CommodityTypeController;
    constructor();
    private initializeRoutes;
}
export default CommodityTypeRoute;
