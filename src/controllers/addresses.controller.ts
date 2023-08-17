import { NextFunction, Request, Response } from 'express';
import { CreateAddressDto } from '@dtos/addresses.dto';
import { Address } from '@interfaces/addresses.interface';
import AddressService from '@services/addresses.service';

class AddressController {
  public addressService = new AddressService();
 
    

  public getAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAddressesData: Address[] = await this.addressService.findAllAddresses();
console.log(findAllAddressesData);
      res.status(200).json(findAllAddressesData);
      
    } catch (error) {
      next(error);
    }
  };


  public getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId = Number(req.params.id);
      const findAllAddressesData: Address = await this.addressService.findAddressById(addressId);

      res.status(200).json(findAllAddressesData);
    } catch (error) {
      next(error);
    }
  };
  
  public createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressData: CreateAddressDto = req.body;
      const createAddressData: Address = await this.addressService.createAddress(addressData);
      console.log(createAddressData);
      res.status(201).json({ message: 'Address successfully created id:'+createAddressData.address_id});
    } catch (error) {
      next(error);
    }
  };

  public updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId = Number(req.params.id);
      const addressData: CreateAddressDto = req.body;
      const updateAddressData: Address = await this.addressService.updateAddress(addressId, addressData);

      res.status(200).json({ message: 'Address successfully updated'+ updateAddressData. address_id});
    } catch (error) {
      next(error);
    }
  };

  public deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId = Number(req.params.id);
      const deleteAddressData: Address = await this.addressService.deleteAddress(addressId);

      res.status(200).json({ message: 'Address deleted', data: deleteAddressData });
    } catch (error) {
      next(error);
    }
  };
  public getjoinCustomerAndAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer_id = Number(req.params.id);
      console.log("cust_id" ,customer_id)
      const joinedData = await this.addressService.getjoinCustomerAndAddress(customer_id);
    
      res.status(200).json(joinedData);

    } catch (error) {
      next(error);
    }
  };
}

export default AddressController;
