export interface Product {
  mrp: number;
  selling_price: number;
  commodities: any;
  quantity: number;
  //commodity: number;
  product_id: number;
  product_name: string;
  product_desc: string;
  image_id: BigInt;
  max_allowed_items: number;
  status: number;
  created_on: Date;
  created_by: number;
  updated_on: Date;
  updated_by: number;
  product_code: string;
}
