import DB from '@databases'; // Adjust the import path accordingly
import { CreateProductDto } from '@dtos/product.dto'; // Adjust the import path accordingly
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/product.interface'; // Adjust the import path accordingly
import { isEmpty } from '@utils/util';
import { Sequelize } from 'sequelize';
interface Commodity {
  commodity_id: any;
  commodity_name: any;
  quantity: any;
  measurement_unit: any;
}

interface CommodityType {
  commodity_type_id: any;
  commodity_type_name: any;
  allowed_items: any;
  commodities: Commodity[];
}

interface ProductInfo {
  product_name: any;
  product_desc: any;
  max_allowed_items: any;
  comodity_item: CommodityType[];
}
class ProductService {
  public products = DB.Products; // Use the appropriate database model for products
public connection=DB.sequelize;
  public async findAllProducts(): Promise<Product[]> {
    const allProducts: Product[] = await this.products.findAll();
    return allProducts;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(500, 'Invalid Product');

    const findProduct: Product = await this.products.findByPk(productId);
    if (!findProduct) throw new HttpException(500, 'Invalid Product');

    return findProduct;
  }

  public async createProduct(productData: any): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(500, 'Invalid Product');

  

    const createProductData: Product = await this.products.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: number, productData: any): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'Product data cannot be empty');

    const foundProduct: Product = await this.products.findByPk(productId);
    if (!foundProduct) throw new HttpException(404, 'Product not found');

    await this.products.update(productData, { where: { product_id: productId } });

    const updatedProduct: Product = await this.products.findByPk(productId);
    
    return updatedProduct;
  }
  
  
public async getProductInfo(productId: number): Promise<any> {
  
  const productSelectQuery = `
  SELECT * FROM product
  WHERE product_id = ?
`;

  const [productData]: any = await this.connection.query(productSelectQuery, { replacements: [productId] });

  if (!productData.length) {
    throw new Error("Product not found");
  }
  const commodityTypeSelectQuery = `
  SELECT pct.*,ct.commodity_type_name FROM product_category_types pct,commodity_type ct
  WHERE ct.commodity_type_id=pct.commodity_type_id and product_id = ?
`;

  const [commodityTypes]: any = await this.connection.query(commodityTypeSelectQuery, { replacements: [productId] });
  console.log(commodityTypes)
  const productInfo: ProductInfo = {
    product_name: productData[0].product_name,
    product_desc: productData[0].product_desc,
    max_allowed_items: productData[0].max_allowed_items,
    comodity_item: []
  };

  for (const commodityType of commodityTypes) {
    const commoditySelectQuery = `
      SELECT pca.*,commodity_name  FROM product_commodity_association pca,commodity c
      WHERE c.commodity_id=pca.commodity_id and product_category_types_id in(?) and product_id in(?)
    `;

    const [commodities]: any = await this.connection.query(commoditySelectQuery, {
      replacements: [
        commodityType.product_category_types_id,
        commodityType.product_id
      ]
    });

    const comodityItem: CommodityType = {
      commodity_type_id: commodityType.commodity_type_id,
      commodity_type_name: commodityType.commodity_type_name,
      allowed_items: commodityType.allowed_items,
      commodities: commodities.map((commodity: any) => ({
        commodity_id: commodity.commodity_id,
        commodity_name: commodity.commodity_name,
        quantity: commodity.quantity,
        measurement_unit: commodity.measurement_unit
      }))
    };

    productInfo.comodity_item.push(comodityItem);
  }

  return productInfo;
}
public async getCommoditiesByType(): Promise<{ [key: string]: string[] }> {
  try {
    const query = `
      SELECT ct.commodity_type_name, c.commodity_name
      FROM commodity c, commodity_type ct
      WHERE c.commodity_type_id = ct.commodity_type_id
    `;

    const [results]: any = await this.connection.query(query,{raw: true,});

    const structuredData: { [key: string]: string[] } = {};
    for (const result of results) {
      if (!structuredData[result.commodity_type_name]) {
        structuredData[result.commodity_type_name] = [];
      }
      structuredData[result.commodity_type_name].push(result.commodity_name);
    }

    return structuredData;
  } catch (error) {
    throw error;
  }
}
public async getProductByStoke(): Promise<any> {
  try {
    const query = `
      SELECT DISTINCT product_name, mrp, selling_price, quantity, effective_date
      FROM stock s
      JOIN product p ON s.product_id = p.product_id;
      
    `;

    const results: any = await this.connection.query(query,{mapToModel:true,model:this.products});

 

    return results;
  } catch (error) {
    throw error;
  }
}

}
export default ProductService;
