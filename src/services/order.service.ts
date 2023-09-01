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



//public async calculateOrderPrice(cartData: cartData): Promise<{ products: Product[]; total_price: number; total_discount: number }> {

public async calculateOrderPric(cartData: cartData): Promise<any> {
  const result: any[] = [];
  let total_price = 0;
  let total_discount = 0;

  // Create an array to store product_ids for the products in cartData
  const productIds: number[] = cartData.products.map((cartProduct) => cartProduct.product_id);

  console.log(productIds);
  // Query the stock table to check product availability and quantity for all products
  const query = `
  SELECT product_id, quantity
  FROM Stock
  WHERE product_id IN (${productIds.join(', ')})
`;

// Execute the raw SQL query
const stockInfoArray: any[] = await this.sequelize.query(query, {
  type: sequelize.QueryTypes.SELECT,
});
 
// Create a map to store stock information based on product_id
//const stockInfoMap = {};
// Wrap the single object in an array and then use forEach to iterate
if (Array.isArray(stockInfoArray)) {
  stockInfoArray.forEach((stockInfo) => {
    stockInfo[stockInfo.product_id] = stockInfo.quantity;
  });
}
 

//   // Create a map to store commodity information based on product_id
//   const commodityInfoMap: { [key: number]: any[] } = {};

//   for (const cartProduct of cartData.products) {
//     const product_id = cartProduct.product_id;
//     const requiredQuantity = cartProduct.quantity;

//     // Get stock information for the current product from the map
//     const stockInfo: Stock | undefined = stockInfoMap[product_id];

//     if (stockInfo && stockInfo.quantity >= requiredQuantity) {
//       // Product is available and has sufficient quantity

//       // Query the price table to get pricing information
//       const priceInfo: any | null = await this.price.findOne({
//         where: {
//           product_id: product_id,
//         },
//       });

//       if (priceInfo) {
//         // Calculate selling price, discount, MRPs, and discount percentages
//         const sellingPrice = priceInfo.selling_price;
//         const discount = priceInfo.mrp - sellingPrice;
//         const mrp = priceInfo.mrp;
//         const discountPercentage = (discount / mrp) * 100;

//         // Calculate the total price and total discount for this product
//         const productTotalPrice = sellingPrice * requiredQuantity;
//         const productTotalDiscount = discount * requiredQuantity;

//         // Add to the total_price and total_discount
//         total_price += productTotalPrice;
//         total_discount += productTotalDiscount;

//         // Create a Product object with pricing details
//         const productDetails:any = {
//           product_id: product_id,
//           quantity: requiredQuantity,
//           selling_price: sellingPrice,
//           discount: discount,
//           mrp: mrp,
//           discount_percentage: discountPercentage,
//           product_total_price: productTotalPrice,
//           product_total_discount: productTotalDiscount,
//         };

//         // Push product details to the result array
//         result.push(productDetails);

//         // Query commodity information for the current product
//         const commodityInfo: any[] = await this.fetchCommodityData(product_id);

//         if (commodityInfo.length > 0) {
//           // Store commodity information in the map
//           commodityInfoMap[product_id] = commodityInfo;
//         }
//       }
//     } else if (stockInfo && stockInfo.quantity > 0) {
//       const availableQuantity = stockInfo.quantity;
//       result.push({
//         product_id: product_id,
//         quantity: requiredQuantity,
//         status: 'available with limited stock',
//         available_quantity: availableQuantity,
//       });
//     } else {
//       // Product is out of stock or has insufficient quantity
//       result.push({
//         product_id: product_id,
//         quantity: requiredQuantity,
//         status: 'out of stock',
//       });
//     }
//   }

//   // Merge the commodity information with the existing result
//   for (const product of result) {
//     if (commodityInfoMap[product.product_id]) {
//       product.commodity = commodityInfoMap[product.product_id];
//     }
//   }

//   // Add the result to the cartData's products array
//   cartData.products = result;

//   return { cartData, total_price: total_price, total_discount: total_discount };
// }
//   fetchStockInfo(productIds: any[]): Stock[] | PromiseLike<Stock[]> {
//     throw new Error('Method not implemented.');
//   }

// // New function to fetch commodity information for a product
// private async fetchCommodityData(product_id: number): Promise<any[]> {
//   // Create a SQL query to fetch commodity data for the specified product
//   const query = `
//     SELECT 
//       pca.product_id,
//       c.commodity_id,
//       c.commodity_name,
//       pca.quantity,
//       um.unit_name
//     FROM product_commodity_association pca
//     JOIN commodity c ON pca.commodity_id = c.commodity_id
//     JOIN unit_master um ON pca.measurement_unit = um.unit_master_id
//     WHERE pca.product_id = ${product_id}
//   `;

//   // Execute the query and retrieve the results
//   const commodityData: any[] = await this.sequelize.query(query, {
//     type: QueryTypes.SELECT,
//   });

//   return commodityData;
};
/*public async calculateorderprice(cartData: cartData): Promise<any> {
  try {
    if (!cartData || !cartData.products || cartData.products.length === 0) {
      throw new HttpException(500, 'Invalid Cart data');
    }

    // Fetch the current server date
    const currentDate = new Date();

    // Create an instance of the ProductService
    const productService = new ProductService();

    // Initialize total discount and total price variables
    let totalDiscount = 0;
    let totalPrice = 0;

    // Create an empty stockMap
    const stockMap = new Map<number, Stock>();

    // Fetch stock, price, and product details for all product IDs in a single query
    const productIds = cartData.products.map((product) => product.product_id);

    const stockAndPriceDetails = await this.sequelize.query(`
      SELECT p.product_id, p.product_name, s.mrp, s.selling_price, pr.start_date, pr.end_date
      FROM product p
      JOIN stock s ON p.product_id = s.product_id
      JOIN price pr ON p.product_id = pr.product_id
      WHERE p.product_id IN (:productIds)
        AND s.effective_on <= :currentDate
        AND pr.start_date <= :currentDate
        AND pr.end_date >= :currentDate
      `, {
        replacements: {
          productIds,
          currentDate,
        },
        type: QueryTypes.SELECT,
        mapToModel:true,
        model: this.product,
      });

    // Populate stockMap with stock and price details
    stockAndPriceDetails.forEach((detail) => {
      stockMap.set(detail.product_id, {
        product_name: detail.product_name,
        mrp: detail.mrp,
        selling_price: detail.selling_price,
      });
    });

    // Calculate discount, discount percentage, discounted price, total discount, and total price
    const updatedCartData = await Promise.all(cartData.products.map(async (cartProduct) => {
      const stockDetail = stockMap.get(cartProduct.product_id);

      if (!stockDetail) {
        throw new HttpException(500, `Stock and price detail not found for product ${cartProduct.product_id}`);
      }

      const { mrp, selling_price, product_name } = stockDetail;

      // Calculate discount
      const discount = mrp - selling_price;

      // Calculate discount percentage
      const discountPercentage = ((discount / mrp) * 100).toFixed(2);

      // Calculate discounted price
      const discountedPrice = (selling_price * cartProduct.quantity).toFixed(2);

      // Update total discount
      totalDiscount += discount * cartProduct.quantity;

      // Update total price
      totalPrice += parseFloat(discountedPrice);

      return {
        product_id: cartProduct.product_id,
        product_name, // Use product_name from the stock and price details
        quantity: cartProduct.quantity,
        discount: parseFloat(discount.toFixed(2)),
        discountPercentage: parseFloat(discountPercentage),
        discountedPrice: parseFloat(discountedPrice),
      };
    }));

    // Calculate the total discount percentage
    let totalDiscountPercentage = ((totalDiscount / totalPrice) * 100).toFixed(2);

    return {
      products: updatedCartData,
      totalDiscount: parseFloat(totalDiscount.toFixed(2)),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      totalDiscountPercentage: parseFloat(totalDiscountPercentage),
    };
  } catch (error) {
    throw new HttpException(500, error.message);
  }
};*/
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
