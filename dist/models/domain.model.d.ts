import { Domain } from '@/interfaces/domain.interface';
import { Sequelize, Model, Optional } from 'sequelize';
export declare type DomainCreationAttributes = Optional<Domain, 'domain_id'>;
export declare class DomainModel extends Model<Domain, DomainCreationAttributes> implements Domain {
    domain_type: string;
    domain_id: number;
    domain_code: string;
    domain_value: string;
    domain_text: string;
    created_on: Date;
    created_by: number;
}
export default function (sequelize: Sequelize): typeof DomainModel;
