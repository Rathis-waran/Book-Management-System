import { pool } from "../db/db.js";

export class BookRepository {
  async getAllBooks(page: number, limit: number, search: string) {
    try {
      const offset = (page - 1) * limit;
      const response = await pool.query(
        `select b.id, b.title, b.isbn, b.price, b.stock, b.image_url, a.name as author,
        c.cat_name as category from books b join authors a on b.author_id = a.id
      join categories c on b.category_id = c.id where b.title ilike $1 or a.name ilike $1
      limit $2 offset $3`,
        [`%${search}%`, limit, offset],
      );

      const countres = await pool.query(
        `select count(*)  from books b join authors a on b.author_id = a.id where b.title ilike $1
         or a.name ilike $1 `,
        [`%${search}%`],
      );

      const totalbooks = Number(countres.rows[0].count);
      const totalPages = Math.ceil(totalbooks / limit);

      return {
        books: response.rows,
        totalBooks: totalbooks,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw error;
    }
  }

  async addBooks(body: any) {
    try {
      const response = await pool.query(
        "insert into books (title,author_id,category_id,price,stock,image_url) values ($1,$2,$3,$4,$5,$6) RETURNING *",
        [
          body.title,
          body.author_id,
          body.category_id,
          body.price,
          body.stock,
          body.image_url,
        ],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async getBooksById(id: number) {
    try {
      const response = await pool.query("select * from books where id = $1", [
        id,
      ]);
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async updateBook(id: number, body: any) {
    try {
      const response = await pool.query(
        "update books set title = $1, author_id = $2, category_id = $3, price = $4, stock = $5 where id = $6 RETURNING*",
        [
          body.title,
          body.author_id,
          body.category_id,
          body.price,
          body.stock,
          id,
        ],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async deleteBook(id: number) {
    try {
      const response = await pool.query(
        "delete from books where id  = $1 returning*",
        [id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async reduceStock(quantity: number, id: number) {
    try {
      const response = await pool.query(
        "update books set stock = stock - $1 where id = $2 RETURNING *",
        [quantity, id],
      );

      if (response.rowCount === 0) {
        return "Book not found or Insufficiant stock";
      }
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }
}
