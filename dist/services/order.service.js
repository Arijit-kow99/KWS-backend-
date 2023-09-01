"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("@exceptions/HttpException");
const _databases_1 = (0, tslib_1.__importDefault)(require("@databases"));
const util_1 = require("@utils/util");
const sequelize_1 = require("sequelize");
class OrderService {
    constructor() {
        this.sequelize = _databases_1.default.sequelize;
        this.order = _databases_1.default.Order;
        this.order_detail = _databases_1.default.Order_Detail;
        this.order_item = _databases_1.default.Order_Item;
        this.order_event = _databases_1.default.Order_Event;
    }
    async findAllOrderbycustomer(customerId) {
        if ((0, util_1.isEmpty)(customerId))
            throw new HttpException_1.HttpException(500, 'Invalid Customer id');
        const query = `
      SELECT
        o.*,
        od.order_details_id,
        od.product_type,
        od.quantity,
        oi.order_items_id,
        oi.measurement_unit AS commodity_measurement_unit,
        c.commodity_id,
        c.commodity_name
        FROM
        \`order\` o
      INNER JOIN
        order_details od ON o.order_id = od.order_id
      INNER JOIN
        order_items oi ON od.order_details_id = oi.order_details_id
      INNER JOIN
        commodity c ON oi.commodity_id = c.commodity_id
      WHERE
        o.customer_id = :customerId
      ORDER BY
        o.created_on DESC;
    `;
        const customerOrders = await this.sequelize.query(query, {
            replacements: { customerId },
            type: sequelize_1.QueryTypes.SELECT, mapToModel: true, model: this.order, plain: true
        });
        return customerOrders;
    }
    async findAllOrderbyorderid(orderid) {
        if ((0, util_1.isEmpty)(orderid))
            throw new HttpException_1.HttpException(500, 'Invalid order id');
        const query = `
      SELECT
        o.*,
        od.order_details_id,
        od.product_type,
        od.quantity,
        oi.order_items_id,
        oi.measurement_unit AS commodity_measurement_unit,
        c.commodity_id,
        c.commodity_name
        FROM
        \`order\` o
      INNER JOIN
        order_details od ON o.order_id = od.order_id
      INNER JOIN
        order_items oi ON od.order_details_id = oi.order_details_id
      INNER JOIN
        commodity c ON oi.commodity_id = c.commodity_id
      WHERE
        o.order_id = :orderid
      ORDER BY
        o.created_on DESC;
    `;
        const Orders = await this.sequelize.query(query, {
            replacements: { orderid },
            type: sequelize_1.QueryTypes.SELECT, mapToModel: true, model: this.order, plain: true
        });
        return Orders;
    }
    ;
    async createOrder(orderInput, transaction) {
        //calculating total price for oder table 
        let totalprice = 0;
        if ((0, util_1.isEmpty)(orderInput.products)) {
            totalprice = 0;
        }
        else {
            for (const product of orderInput.products) {
                totalprice += product.quantity * product.unit_price;
            }
        }
        let ord = {
            payment_status: orderInput.payment_status,
            payment_mode: orderInput.payment_mode,
            customer_id: orderInput.customer_id,
            address_id: orderInput.address_id,
            created_by: orderInput.created_by,
            updated_by: orderInput.updated_by,
            total_price: totalprice,
            status: 1
        };
        const createOrder = await this.order.create(ord, { transaction });
        if (!createOrder)
            throw new HttpException_1.HttpException(500, 'could not place order');
        // picking up the order_id from last insert 
        const orderId = createOrder.order_id;
        // storing details of the product and calculating price of each product 
        let Product = [];
        for (const product of orderInput.products) {
            const { product_id, quantity, unit_price } = product;
            const productTotalPrice = quantity * unit_price;
            Product.push({
                product_id,
                quantity,
                unit_price,
                sub_total_price: productTotalPrice,
                order_id: orderId // Assign the 'orderId' here
            });
        }
        // inserting the product details into 
        const OrderDetails = await this.order_detail.bulkCreate(Product, { transaction });
        if (!OrderDetails)
            throw new HttpException_1.HttpException(500, 'could not place order');
        //extracting all order_detail_ids 
        const orderDetailsIds = OrderDetails.map((orderDetail) => orderDetail.order_details_id);
        let Orderitems = [];
        // Iterate through 'orderInput.products'
        for (let i = 0; i < orderInput.products.length; i++) {
            const product = orderInput.products[i];
            const { product_id } = product;
            if (!(0, util_1.isEmpty)(product.commodities)) {
                for (const commodity of product.commodities) {
                    const { commodity_id, measurement_unit, quantity } = commodity;
                    // Assign the 'order_details_id' corresponding to the current product
                    const order_details_id = orderDetailsIds[i];
                    Orderitems.push({
                        order_details_id,
                        commodity_id,
                        measurement_unit,
                        quantity,
                    });
                }
            }
        }
        const OrderItems = await this.order_item.bulkCreate(Orderitems, { transaction });
        const ordereventdetails = {
            order_id: orderId // Assigning the orderId here
        };
        const OrderEvent = await this.order_event.create(ordereventdetails, { transaction });
        const successMessage = 'Order successfully placed';
        return successMessage;
    }
    ;
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map