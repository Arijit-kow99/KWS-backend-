import { Routes } from '@interfaces/routes.interface';
import domainController from '@/controllers/domain.controller';
declare class DomainRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    domainController: domainController;
    constructor();
    private initializeRoutes;
}
export default DomainRoute;
