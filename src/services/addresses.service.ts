import { Address } from '@interfaces/addresses.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AddressService {
  public addresses = DB.Addresses;

  public async findAllAddresses(): Promise<Address[]> {
    const allAddresses: Address[] = await this.addresses.findAll();
    return allAddresses;
  }

  public async findAddressById(addressId: number): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(500, 'Invalid Address');

    const findAddress: Address = await this.addresses.findByPk(addressId);
    if (!findAddress) throw new HttpException(500, 'Invalid Address');

    return findAddress;
  }

  public async getjoinCustomerAndAddress(customer_id: number): Promise<any> {
    let  r;
    try {
      const query = `
      select a.*
      from kws.address a, kws.customer b
      where a.customer_id = b.customer_id
      and b.customer_id =:customer_id;
      `;
      const results = await (DB.sequelize as any).query(query, {
        replacements: { customer_id },
        type: (DB.sequelize as any).QueryTypes.SELECT,

      });
r=results
      console.log(results);
      
    } catch (error) {
      console.error('Error executing raw SQL query:', error);
    }
    return r;
  }

  

  
  

  
  public async createAddress(addressData: any): Promise<Address> {
    if (isEmpty(addressData)) {
      throw new HttpException(500, 'Invalid Address');
    }

    const createAddressData: Address = await this.addresses.create(addressData);
    return createAddressData;
  }

  public async updateAddress(addressId: number, addressData: any): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(500, 'Invalid Address');

    const findAddress: Address = await this.addresses.findByPk(addressId);
    if (!findAddress) throw new HttpException(500, 'Invalid Address');

    await this.addresses.update(addressData, { where: { address_id: addressId } });

    const updatedAddress: Address = await this.addresses.findByPk(addressId);
    return updatedAddress;
  }

  public async deleteAddress(addressId: number): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(500, 'Invalid Address');

    const findAddress: Address = await this.addresses.findByPk(addressId);
    if (!findAddress) throw new HttpException(500, 'Invalid Address');

    await this.addresses.destroy({ where: { address_id: addressId } });

    return findAddress;
  }
}

export default AddressService;
