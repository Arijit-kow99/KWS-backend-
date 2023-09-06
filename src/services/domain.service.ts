import { compare, hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Domain } from 'domain';
import { mapWhereFieldNames } from 'sequelize/types/utils';
import { QueryTypes } from 'sequelize';

class DomainService {
  private sequelize = DB.sequelize;
  public domain = DB.Domain;

  public async findAllDomain(domain_type:string): Promise<any> {
    if (isEmpty(domain_type)) throw new HttpException(500,'Invalid Request');
    // const alldomain: any = await this.domain.findAll({
    //   where: {
    //     domain_type: "domain_type",
    //   },
    // });
    const query = `
        SELECT domain_type FROM domain
        WHERE domain_type =:domain_type ;
      `;

      const results = await this.sequelize.query(query, {
        replacements: { domain_type },
        type: QueryTypes.SELECT,
      });
    return results;
  }

 
}

export default DomainService;
