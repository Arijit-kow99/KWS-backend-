import Sequelize from 'sequelize';
declare const DB: {
    Users: typeof import("@models/users.model").UserModel;
    Products: typeof import("@/models/product.model").ProductModel;
    Product_Commoditys: typeof import("@/models/product_commodity_association.model").ProductCommodityAssociationModel;
    Product_Category_Types: typeof import("@/models/product_category_types.model").ProductCategoryTypeModel;
    Images: typeof import("@/models/image.model").imageModel;
    Commoditys: typeof import("@/models/commodity.model").CommodityModel;
    Customers: typeof import("@/models/customer.model").CutomerModel;
    Addresses: typeof import("@/models/addresses.model").AddressModel;
    commodityTypes: typeof import("@/models/commodity_type.model").CommodityTypeModel;
    Order: typeof import("@/models/order.model").OrderModel;
    Order_Detail: typeof import("@/models/order_detail.model").OrderDetailModel;
    Order_Item: typeof import("@/models/order_event.model").OrderEventModel;
    Order_Event: typeof import("@/models/order_item.model").OrderItemsModel;
    sequelize: Sequelize.Sequelize;
    Sequelize: typeof Sequelize;
};
export default DB;
