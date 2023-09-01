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
  public order_item = DB.Order_Item;
  public order_event = DB.Order_Event;
  public stock = DB.Stock;
  public product = DB.Product;
  public price = DB.Price; 

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
      order_id: orderId // Assigning the orderId here again 
    };
    
    const OrderEvent =await this.order_event.create(ordereventdetails,{transaction})
    const successMessage = 'Order successfully placed';
    return successMessage
};


public async calculateOrderPrice(cartData: cartData) {
  if (!cartData || !cartData.products || cartData.products.length === 0) {
    throw new HttpException(500, 'Invalid Cart data');
  }

  // Fetch the current server date
  const currentDate = new Date();

  // Initialize total discount and total price variables
  let totalDiscount = 0;
  let totalPrice = 0;

  // Capture all product ids inside the order.
  const productIds: number[] = cartData.products.map((product) => product.product_id);

  // Creating a query for fetching product details
  const products = await this.product.findAll({
    where: {
      product_id: productIds,
    },
  });

  // Create a dictionary where keys are product_ids and values are product details
  const productsById: { [key: number]: any } = {};
  products.forEach((product) => {
    productsById[product.product_id] = product;
  });

  // Create a query to fetch stock and price details for all products in cartdata
  const query = `
    SELECT
      p.product_id,
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
      p.product_id IN (:productIds)
  `;

  const customerOrders = await this.sequelize.query(query, {
    replacements: { productIds }, // Pass the array of product_ids as replacements
    type: QueryTypes.SELECT,
  });

  // Create an array to store the results including product details
  const result: any[] = [];

  // Create a Set to store unique commodities
  const uniqueCommodities = new Set<number>();

  // Iterate through each product in cartData
  for (const cartProduct of cartData.products) {
    const productId = cartProduct.product_id;

    // Fetch the product details from the dictionary
    const productDetails = productsById[productId];

    // Find the corresponding order details for the product
    const orderDetails = customerOrders.find((order) => order.product_id === productId);

    if (!orderDetails) {
      throw new HttpException(500, 'Product details not found');
    }

    const stockQuantity = orderDetails.stock_quantity;
    const requiredQuantity = cartProduct.quantity;
    const mrp = orderDetails.mrp;
    const sellingPrice = orderDetails.selling_price;

    if (stockQuantity >= requiredQuantity) {
      // Sufficient stock available
      const productTotalPrice = sellingPrice * requiredQuantity;
      totalPrice += productTotalPrice;

      // Calculate the total discount for this product
      const productDiscount = (mrp - sellingPrice) * requiredQuantity;
      totalDiscount += productDiscount;

      // Create a dictionary to store commodity details for this product
      const productCommodities: { [key: number]: any } = {};

      // Add the commodities to the uniqueCommodities Set
      if (cartProduct.commodities) {
        cartProduct.commodities.forEach((commodityId) => {
          uniqueCommodities.add(commodityId);

          // Initialize the commodity details with empty values
          productCommodities[commodityId] = {
            commodity_name: '',
            quantity: 0,
            unit_name: '',
          };
        });
      }

      // Add the product details, calculated values, and commodity details to the result
      result.push({
        product_id: productId,
        quantity: requiredQuantity,
        product_name: productDetails.product_name,
        productTotalPrice,
        productDiscount,
        commodities: productCommodities, // Initialize with empty commodity details
      });
    } else {
      // Insufficient stock
      throw new HttpException(500, `Insufficient stock for product ${productId}`);
    }
  }

  // Create a query to fetch commodity details for uniqueCommodities
  const uniqueCommoditiesArray = Array.from(uniqueCommodities);
  const queryForCommodities = `
    SELECT
      c.commodity_id,
      c.commodity_name,
      pca.quantity,
      um.unit_name
    FROM
      commodity c
    JOIN
      product_commodity_association pca ON c.commodity_id = pca.commodity_id
    JOIN
      unit_master um ON pca.measurement_unit = um.unit_master_id
    WHERE
      c.commodity_id IN (:uniqueCommoditiesArray)
  `;

  // Fetch commodity details for uniqueCommoditiesArray
  const commodityDetails = await this.sequelize.query(queryForCommodities, {
    replacements: { uniqueCommoditiesArray }, // Pass the array of uniqueCommoditiesArray as replacements
    type: QueryTypes.SELECT,
  });

  // Iterate through each product's commodities and add their details to the result
  for (const product of result) {
    const commodities = product.commodities;

    if (commodities) {
      for (const commodityId in commodities) {
        if (commodities.hasOwnProperty(commodityId)) {
          const commodity = commodities[commodityId];
          const commodityDetail = commodityDetails.find((commodity) => commodity.commodity_id === +commodityId);

          if (commodityDetail) {
            // Update commodity details in the product's commodity
            commodity.commodity_name = commodityDetail.commodity_name;
            commodity.quantity = commodityDetail.quantity;
            commodity.unit_name = commodityDetail.unit_name;
          }
        }
      }
    }
  }

  // Calculate the total discount percentage
  const totalDiscountPercentage = ((totalDiscount / totalPrice) * 100).toFixed(2);

  // Return the calculated total price, total discount, total discount percentage, and product details
  return { totalPrice, totalDiscount, totalDiscountPercentage, products: result };
}




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
