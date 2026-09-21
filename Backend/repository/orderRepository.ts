import { pool } from "../db/db.js";

export class OrderRepository {
  async addOrder(order: any) {
    const orderResult = await pool.query(
      `insert into orders (cart_id, totalamount) VALUES ($1, $2) RETURNING id`,
      [order.cart_id, order.totalamount],
    );
    const orderId = orderResult.rows[0].id;
    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      await pool.query(
        `insert into order_items (order_id, book_id, quantity, price) VALUES ($1, $2, $3, $4)`,
        [orderId, item.book_id, item.quantity, item.price],
      );
    }
    return "order successfully";
  }

  async getallorders(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `
    select o.id as order_id,o.cart_id, o.totalamount, o.created_at, oi.book_id, b.title,
    b.image_url, oi.quantity, oi.price
    from orders o join order_items oi on o.id = oi.order_id
    join books b on b.id = oi.book_id
    order by o.created_at desc limit $1 offset $2
  `,
      [limit, offset],
    );

    const resultlength = await pool.query("select * from order_items");

    const totalorders = Number(resultlength.rowCount);
    const orderpages = Math.ceil(totalorders / limit);

    return { orders: result.rows, totalorders, orderpages };
  }
}
