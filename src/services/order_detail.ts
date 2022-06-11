import client from '../database';
//import { Order } from '../models/types/orders.types';
//import { Order_detail } from '../models/types/order_details.types';

export class Order_reports {
  async showActiveOrders(user_id: number): Promise<
    {
      order_id: number;
      product_id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
    }[]
  > {
    try {
      const sql = `select order_id,product_id,name,price,quantity , quantity*price as total
        from product inner join order_details
        on product.id = order_details.product_id 
        inner join orders 
        on orders.id = order_details.order_id
        where orders.user_id = ${user_id} 
        and orders.order_status = 'active' ;`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find order_products for user ${user_id}. Error: ${err}`
      );
    }
  }
  async showCompletedOrders(user_id: number): Promise<
    {
      order_id: number;
      product_id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
    }[]
  > {
    try {
      const sql = `select order_id,product_id,name,price,quantity , quantity*price as total
      from product inner join order_details
      on product.id = order_details.product_id 
      inner join orders 
      on orders.id = order_details.order_id
      where orders.user_id = ${user_id} 
      and orders.order_status = 'complete' ;`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find order_products for user ${user_id}. Error: ${err}`
      );
    }
  }
}
