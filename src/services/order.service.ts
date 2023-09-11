import { HttpException } from '@exceptions/HttpException';
import DB from '@databases';
import { isEmpty } from '@utils/util';
import { Op, QueryTypes } from 'sequelize';
import orderModel, { OrderModel } from '@/models/order.model';
import { OrderInput ,cartData , product } from '@/interfaces/order.interface';
import { Stock } from '@/interfaces/stock.interface';
import { ProductModel } from '@/models/product.model';
import { Product } from '@/interfaces/product.interface';
import sequelize from 'sequelize';
import ProductService from './product.service';


class OrderService {
  private sequelize = DB.sequelize;
  public order = DB.Order;
  public order_detail = DB.Order_Detail;
  public order_items = DB.Order_Item;
  public order_event = DB.Order_Event;
  public stock = DB.Stock;
  public product = DB.Product;
  public price = DB.Price; 

  public async findAllOrderbycustomer(customerId: number): Promise<any> {
    if (isEmpty(customerId)) throw new HttpException(500, 'Invalid Customer id');

    const query = `
      SELECT
        o.order_id,
        o.order_code,
        o.created_on,
        o.address_id,
        o.expected_delivery_date,
        od.product_id,
        od.quantity,
        p.product_name
      
        FROM
        \`order\` o
      INNER JOIN
        order_details od ON o.order_id = od.order_id
      INNER JOIN
        order_items oi ON od.order_details_id = oi.order_details_id
      INNER JOIN
        product p ON od.product_id = p.product_id 
      WHERE
        o.customer_id = :customerId
      ORDER BY
        o.created_on DESC;
    `;

    const customerOrders = await this.sequelize.query(query, {
      replacements: { customerId },
      type: QueryTypes.SELECT, mapToModel:true, model:this.order, plain:false
    });
    const uniqueOrders = customerOrders.reduce((accumulator, order) => {
      const existingOrder = accumulator.find((item) => item.order_id === order.order_id);
      if (existingOrder) {
        // Order ID already exists, merge the details
        //existingOrder.quantity += order.quantity;
      } else {
        // Order ID doesn't exist, add it to the accumulator
        accumulator.push(order);
      }
      return accumulator;
    }, []);
  
      
    return uniqueOrders;
  }

  public async getorderdetails(orderid: number): Promise<any> {
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

  public async createOrder(orderInput:any,transaction): Promise<any> {
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
// Function to generate a unique order code
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Function to generate an order code
function generateOrderCode() {
  const randomPart = generateRandomString(Math.floor(Math.random() * 2) + 4); // Generate 4-5 random characters
  const datePart = new Date().getTime().toString().slice(-6); // Get the last 6 digits of the current timestamp
  const orderCode = `BPK${randomPart}${datePart}`;
  return orderCode;
}

// Generate an order code
const orderCode = generateOrderCode();
const d = new Date();

const expectedDeliveryDate = new Date(d);
expectedDeliveryDate.setDate(d.getDate() + 1)

    let ord={
       // payment_status: orderInput.payment_status,
       // payment_mode: orderInput.payment_mode,
      order_code: orderCode,
      customer_id: orderInput.customer_id, 
      address_id: orderInput.address_id,   
      payment_mode:1,
      created_on:d,
      expected_delivery_date: expectedDeliveryDate,

      // created_by: orderInput.created_by,   
     // updated_by: orderInput.updated_by,   
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
    // Get the order_details_id corresponding to the current product
    const order_details_id = orderDetailsIds[i];

    for (const commodity of product.commodities) {
      const { commodity_id, measurement_unit, quantity } = commodity;

      // Create an order_items entry for each commodity
      Orderitems.push({
        order_details_id,
        commodity_id,
        measurement_unit,
        quantity
      });
    }
  }
}
const createdOrderItems = await this.order_items.bulkCreate(Orderitems, { transaction });
    const date = new Date();
   const ordereventdetails = {
      order_id: orderId, // Assigning the orderId here again 
      created_on:date
     };
    
    const OrderEvent =await this.order_event.create(ordereventdetails,{transaction})
    const successMessage = 'Order successfully placed';
   return successMessage;
 return successMessage;
};


public async calculateOrderPrice(cartData: cartData) {
  if (!cartData || !cartData.products || cartData.products.length === 0) {
    throw new HttpException(500, 'Invalid Cart data');
  }

  let totalDiscount = 0;
  let totalPrice = 0;
  let totalmrp = 0;

  const productIds: number[] = cartData.products.map(product => product.product_id);

  const query = `
    SELECT
      p.*,
      s.quantity AS stock_quantity,
      pr.mrp,
      pr.selling_price
    FROM
      product AS p
    JOIN
      stock AS s ON p.product_id = s.product_id
    JOIN
      price AS pr ON p.product_id = pr.product_id
    WHERE
      p.product_id IN (${productIds.join(',')})
  `;

  let products: Product[] = await this.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  let commodity: number[] = [];
  cartData.products.forEach(m => m.commodities.forEach(n => commodity.push(n)));

  const queryForCommodities = `
    SELECT
      c.commodity_id,
      c.commodity_name,
      pca.*,
      um.unit_name
    FROM
      commodity c
    JOIN
      product_commodity_association pca ON c.commodity_id = pca.commodity_id
    JOIN
      unit_master um ON pca.measurement_unit = um.unit_master_id
    WHERE
      c.commodity_id IN (${commodity.join(',')})
  `;

  const commodityDetails: any = await this.sequelize.query(queryForCommodities, {
    type: QueryTypes.SELECT,
  });

  products.forEach(item => {
    const cartItem = cartData.products.find(cartItem => cartItem.product_id === item.product_id);
    if (cartItem) {
      item.quantity = cartItem.quantity; // Set the ordered quantity for the product
    }

    item.commodities = commodityDetails.filter(m => m.product_id == item.product_id);
    totalPrice = totalPrice + item.selling_price * item.quantity;
    totalmrp = totalmrp + item.mrp * item.quantity;
    totalDiscount = totalDiscount + ((item.mrp - item.selling_price) * item.quantity);
  });

  const totalDiscountPercentage = ((totalDiscount / totalmrp) * 100).toFixed(2);

  return { product: products, totalPrice, totalmrp, totalDiscount, totalDiscountPercentage };
};





public async orderprice(cartData: cartData)
{
   // Hardcoded data
   const hardcodedData = {
    products: [
      {
        product_id: 2,
        product_name :"Small Box",
        quantity: 2,
        product_price: 125,
        discount: 25,
        discountPercentage: "9.09",
        discountedPrice: 200,
        commodity:[
          {commodity_id:1,
            commodity_name: "brinjal" ,
            unit : "gm",
            measurement:500
            },{commodity_id:2,
              commodity_name: "ladiesfinger",
              unit : "gm",
              measurement:200
              }]
      },
      {
        product_id: 6,
        product_name :"Large Box",
        quantity: 3,
        product_price: 550,
        discount: 50,
        discountPercentage: "23.08",
        discountedPrice: 1500,
        commodity:[
          {commodity_id:3,
            commodity_name: "Carrot" ,
            unit : "gm",
            measurement:500
            },{commodity_id:4,
              commodity_name: "Kundru",
              unit : "gm",
              measurement:200
              }]
      },
      {
        product_id: 7,
        product_name :"Medium  Box",
        quantity: 1,
        product_price: 370,
        discount: 70,
        discountPercentage: "41.18",
        discountedPrice: 300,
        commodity:[
          {commodity_id:1,
            commodity_name: "Tomatoes" ,
            unit : "gm",
            measurement:500
            },{commodity_id:2,
              commodity_name: "Capsicum",
              unit : "gm",
              measurement:200
              }]
      },
    ],
    totalDiscount: 570,
    totalPrice: 2100,
  };

  // Return the hardcoded data
  return hardcodedData;
};

}

export default OrderService;
