import ImageController from '@controllers/image.controller';
import { Routes } from '@interfaces/routes.interface';
declare class CommonRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    storage: any;
    upload: any;
    imageController: ImageController;
    constructor();
    private initializeRoutes;
}
export default CommonRoute;
