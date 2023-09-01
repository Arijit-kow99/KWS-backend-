import { NextFunction, Request, Response } from 'express';
import ImageService from '@services/image.service';
declare class ImageController {
    imageService: ImageService;
    getImageById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    uploadImage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
export default ImageController;
