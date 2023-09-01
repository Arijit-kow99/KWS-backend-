import { NextFunction, Request, Response } from 'express';
import AddressService from '@services/addresses.service';
declare class AddressController {
    addressService: AddressService;
    getAddresses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAddressById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAddressByCustId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AddressController;
