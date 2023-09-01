declare class QueryDao {
    users: typeof import("../models/users.model").UserModel;
    sequelize: import("sequelize/types").Sequelize;
}
export default QueryDao;
