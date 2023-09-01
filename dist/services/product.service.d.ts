import { Product } from '@interfaces/product.interface';
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
declare class ProductService {
    products: typeof import("../models/product.model").ProductModel;
    connection: Sequelize;
    findAllProducts(): Promise<Product[]>;
    findProductById(productId: number): Promise<Product>;
    createProduct(productData: any): Promise<Product>;
    updateProduct(productId: number, productData: any): Promise<Product>;
    getProductInfo(productId: number): Promise<any>;
    getCommoditiesByType(): Promise<{
        [key: string]: string[];
    }>;
    getProductByStoke(): Promise<any>;
    insertOrderData(jsonData: ProductInfo): Promise<any>;
}
export default ProductService;
