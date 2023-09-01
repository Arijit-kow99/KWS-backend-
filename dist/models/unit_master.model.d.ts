import { Sequelize, Model, Optional } from 'sequelize';
import { Unitmaster } from '@interfaces/unit_master.interface';
export declare type UnitMasterCreationAttributes = Optional<Unitmaster, 'unit_master_id'>;
export declare class UnitMasterModel extends Model<Unitmaster, UnitMasterCreationAttributes> implements Unitmaster {
    unit_master_id: number;
    unit_name: string;
}
export default function (sequelize: Sequelize): typeof UnitMasterModel;
