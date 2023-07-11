import DB from '@databases';

class QueryDao {
  public users = DB.Users;
  public sequelize = DB.sequelize;
}

export default QueryDao;
