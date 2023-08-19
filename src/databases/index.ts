import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import CommodityModel from '@/models/commodity.model';
import imageModel from '@/models/image.model';
import ProductCommodityAssociationModel from '@/models/product_commodity_association.model';
import ProductCategoryTypeModel from '@/models/product_category_types.model';
import ProductModel from '@/models/product.model';
import CutomerModel from '@/models/customer.model';
import  AddressModel  from '@/models/addresses.model';
import  CommodityTypeModel  from '@/models/commodity_type.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  timezone: '+05:30',
  query: { raw: true },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Products: ProductModel(sequelize),
  Product_Commoditys: ProductCommodityAssociationModel(sequelize),
  Product_Category_Types: ProductCategoryTypeModel(sequelize),
  Images: imageModel(sequelize),
  Commoditys: CommodityModel(sequelize),
  Customers: CutomerModel(sequelize),
  Addresses: AddressModel(sequelize),
  commodityTypes:CommodityTypeModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
