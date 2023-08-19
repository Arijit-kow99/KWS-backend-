import DB from '@databases'; // Adjust the import path accordingly
import { CreateProductDto } from '@dtos/product.dto'; // Adjust the import path accordingly
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/product.interface'; // Adjust the import path accordingly
import { isEmpty } from '@utils/util';

class ProductService {
  public products = DB.Products; // Use the appropriate database model for products

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

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(500, 'Invalid Product');

  

    const createProductData: Product = await this.products.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: number, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'Product data cannot be empty');

    const foundProduct: Product = await this.products.findByPk(productId);
    if (!foundProduct) throw new HttpException(404, 'Product not found');

    await this.products.update(productData, { where: { product_id: productId } });

    const updatedProduct: Product = await this.products.findByPk(productId);
    return updatedProduct;
  }
}

export default ProductService;
