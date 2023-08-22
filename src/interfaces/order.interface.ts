export interface Order{
     order_id: number;
   order_code: string;
   payment_status: number;
   payment_mode: number;
   txn_ref_no: string;
   payment_date: Date;
   customer_id: number;
   address_id: number;
   expected_delivery_date: Date;
   status: number;
   created_on: Date;
   created_by: number;
   updated_on: Date;
   updated_by: number;
   total_price: number;
}