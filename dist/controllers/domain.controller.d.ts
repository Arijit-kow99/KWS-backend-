import { NextFunction, Request, Response } from 'express';
import DomainService from '@/services/domain.service';
declare class domainController {
    DomainService: DomainService;
    getdomain: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default domainController;
