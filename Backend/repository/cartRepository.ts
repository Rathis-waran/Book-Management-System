import { pool } from "../db/db.js";

export class CartRepository {
  async getcartItem() {
    try {
      const response = await pool.query("select * from cart_item");
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async getcartById(cart_id: number) {
    try {
      const response = await pool.query("select * from cart where id = $1", [
        cart_id,
      ]);
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async createCart() {
    try {
      const response = await pool.query(
        "insert INTO cart default values RETURNING *",
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async getallcart() {
    try {
      const response = await pool.query("select * from cart");
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async addToCart(cart_id: number, book_id: number, quantity: number) {
    try {
      const response = await pool.query(
        `insert INTO cart_item (cart_id, book_id, quantity) values ($1, $2, $3) on conflict (cart_id, book_id) do UPDATE SET quantity = cart_item.quantity + excluded.quantity
       RETURNING *`,
        [cart_id, book_id, quantity],
      );
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async updateCart(id: number, quantity: number) {
    try {
      const response = await pool.query(
        `update cart_item
       set quantity = $1
       where id = $2
       RETURNING *`,
        [quantity, id],
      );

      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async deleteCart(id: number) {
    try {
      const response = await pool.query(
        `delete from cart_item
       where id = $1
       RETURNING *`,
        [id],
      );

      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async getCart(cart_id: number) {
    try {
      const response = await pool.query(
        `select cart_item.id,cart_item.cart_id,cart_item.book_id,cart_item.quantity,
         books.image_url,books.price,books.title,books.stock,(books.price * cart_item.quantity) as total
       from cart_item JOIN books ON cart_item.book_id = books.id where cart_item.cart_id = $1`,
        [cart_id],
      );

      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async clearCart(cart_id: number) {
    try {
      const response = await pool.query(
        `delete from cart_item
       where cart_id = $1
       RETURNING *`,
        [cart_id],
      );

      return response.rows;
    } catch (error) {
      return error;
    }
  }
}
