import { HttpException } from '@exceptions/HttpException';
import DB from '@databases';
import { isEmpty } from '@utils/util';
import { QueryTypes } from 'sequelize';
import orderModel, { OrderModel } from '@/models/order.model';
import { OrderInput } from '@/interfaces/order.interface';



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
      type: QueryTypes.SELECT, mapToModel:true, model:this.order, plain:true
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
      type: QueryTypes.SELECT, mapToModel:true, model:this.order,plain:true
    });
      
    return Orders;
  };

  public async createOrder(orderInput:OrderInput,transaction): Promise<any> {
    //calculating total price for oder table 
    let totalprice = 0;
    if(isEmpty(orderInput.products))
    { totalprice=0
    }else{
      for (const product of orderInput.products)
    {
      totalprice += product.quantity * product.unit_price;
    }
    }
    

    let ord={
      payment_status: orderInput.payment_status,
      payment_mode: orderInput.payment_mode,
      customer_id: orderInput.customer_id, 
      address_id: orderInput.address_id,   
      created_by: orderInput.created_by,   
      updated_by: orderInput.updated_by,   
      total_price: totalprice,
      status:1
    };
   
    const createOrder = await this.order.create(ord,{transaction})
    if(!createOrder) throw new HttpException(500,'could not place order');
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
   const OrderDetails= await this.order_detail.bulkCreate(Product,{transaction})
   if(!OrderDetails) throw new HttpException(500,'could not place order');

//extracting all order_detail_ids 
const orderDetailsIds = OrderDetails.map((orderDetail) => orderDetail.order_details_id);
let Orderitems = [];

// Iterate through 'orderInput.products'
for (let i = 0; i < orderInput.products.length; i++) {
  const product = orderInput.products[i];
  const { product_id } = product;

  if (!isEmpty(product.commodities)) {
    for (const commodity of product.commodities) {
      const { commodity_id, measurement_unit, quantity } = commodity;

      // Assign the 'order_details_id' corresponding to the current product
      const order_details_id = orderDetailsIds[i];

      Orderitems.push({
        order_details_id, // Assign the 'order_details_id' here
        commodity_id,
        measurement_unit,
        quantity,
      });
    }
  }
}
    const OrderItems= await this.order_item.bulkCreate(Orderitems,{transaction})

    const ordereventdetails = {
      order_id: orderId // Assigning the orderId here
    };
    
    const OrderEvent =await this.order_event.create(ordereventdetails,{transaction})
    const successMessage = 'Order successfully placed';
    return successMessage
};

}

export default OrderService;
