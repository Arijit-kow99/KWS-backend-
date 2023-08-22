import { HttpException } from '@exceptions/HttpException';
import DB from '@databases';
import { isEmpty } from '@utils/util';
import { QueryTypes } from 'sequelize';
import orderModel, { OrderModel } from '@/models/order.model';

interface OrderInput {
  payment_status: number;
  payment_mode: number;
  customer_id: number;
  address_id: number;
  order_event_status?: number;
  created_by: number; // This field is required for "created_by" column
  updated_by: number; // This field is required for "updated_by" column

  products: {
    product_id: number;
    quantity: number;
    unit_price: number;
    commodities: {
      commodity_id: number;
      measurement_unit: string;
      quantity: number;
    }[];
  }[];
}

class OrderService {
  private sequelize = DB.sequelize;
  public order = DB.Order;
  public order_detail = DB.Order_Detail;
  public order_item =DB.Order_Item;
  public order_event= DB.Order_Event;


  public async findAllOrderbycustomer(customerId: number): Promise<any> {
    if (isEmpty(customerId)) throw new HttpException(500, 'Invalid Customer id');

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
      type: QueryTypes.SELECT, mapToModel:true, model:this.order
    });
      
    return customerOrders;
  }

  public async findAllOrderbyorderid(orderid: number): Promise<any> {
    if (isEmpty(orderid)) throw new HttpException(500, 'Invalid order id');

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
      type: QueryTypes.SELECT, mapToModel:true, model:this.order
    });
      
    return Orders;
  };

  public async createOrder(orderInput: OrderInput): Promise<void> {
    try {
      const transaction = await this.sequelize.transaction();

      try {
        // Create the main order record using a raw SQL query
        const mainOrderQuery = `
        INSERT INTO "order" (payment_status, payment_mode, customer_id, address_id, status, total_price, created_on, created_by, updated_on, updated_by)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), ?);
        `;

        const [orderId] = await this.sequelize.query(mainOrderQuery, {
          replacements: [
            orderInput.payment_status,
      orderInput.payment_mode,
      orderInput.customer_id,
      orderInput.address_id,
      1, 
      0, // Initial total price, calculate based on products
      orderInput.created_by,
      orderInput.updated_by, 
    
          ],
          type: QueryTypes.INSERT,
          transaction,
        });

        // Calculate the total price based on products
        let totalPrice = 0;
        for (const product of orderInput.products) {
          totalPrice += product.quantity * product.unit_price;
        }

        // Update the total price in the main order record
        const updateTotalPriceQuery = `
          UPDATE order
          SET total_price = ?
          WHERE order_id = ?;
        `;

        await this.sequelize.query(updateTotalPriceQuery, {
          replacements: [totalPrice, orderId],
          type: QueryTypes.UPDATE,
          transaction,
        });

        for (const product of orderInput.products) {
          const orderDetailQuery = `
            INSERT INTO order_details (product_id, order_id, product_type, quantity, unit_price, sub_total_price)
            VALUES (?, ?, ?, ?, ?, ?);
          `;

          await this.sequelize.query(orderDetailQuery, {
            replacements: [
              product.product_id,
              orderId,
              0, // Replace with the actual product type
              product.quantity,
              product.unit_price,
              product.quantity * product.unit_price,
            ],
            type: QueryTypes.INSERT,
            transaction,
          });

          // Insert order items records
          for (const commodity of product.commodities) {
            const orderItemsQuery = `
              INSERT INTO order_items (order_details_id, commodity_id, measurement_unit, quantity)
              VALUES (?, ?, ?, ?);
            `;

            await this.sequelize.query(orderItemsQuery, {
              replacements: [
                'LAST_INSERT_ID()',
                commodity.commodity_id,
                commodity.measurement_unit,
                commodity.quantity,
              ],
              type: QueryTypes.INSERT,
              transaction,
            });
          }
        }

        // Insert order event record if provided
        if (orderInput.order_event_status !== undefined) {
          const orderEventQuery = `
            INSERT INTO order_event (order_id, status, created_on, created_by)
            VALUES (?, ?, ?, ?);
          `;

          await this.sequelize.query(orderEventQuery, {
            replacements: [orderId, orderInput.order_event_status, new Date()],
            type: QueryTypes.INSERT,
            transaction,
          });
        }

        // Commit the transaction
        await transaction.commit();
      } catch (error) {
        // Rollback the transaction if an error occurs
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new HttpException(500, 'Failed to create an order');
    }
  }
}

export default OrderService;
