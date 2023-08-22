export interface Stock {
    product_price_id: number;
    product_id: number;
    mrp: number;
    selling_price: number;
    quantity: number;
    created_on: Date;
    created_by: number;
    updated_on: Date;
    updated_by: number;
    effective_on: Date;
  }