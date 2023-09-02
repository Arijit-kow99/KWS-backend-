import { compare, hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Domain } from 'domain';
import { mapWhereFieldNames } from 'sequelize/types/utils';

class DomainService {
  public domain = DB.Domain;

  public async findAllDomain(domain_type): Promise<Domain[]> {
   // if (isEmpty(domain_type)) throw new HttpException(500,'Invalid Request');
    const alldomain: any = await this.domain.findAll({
      where: {
        domain_type: domain_type,
      },
    });
    return alldomain;
  }

 
}

export default DomainService;
