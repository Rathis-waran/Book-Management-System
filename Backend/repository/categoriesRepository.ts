import { pool } from "../db/db.js";

export class CategoriesRepository {
  async addCategories(body: any) {
    try {
      const response = await pool.query(
        "insert into categories (cat_name) values ($1) returning *",
        [body.cat_name],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async getAllCategories() {
    try {
      const response = await pool.query("select * from categories");
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async getCategoriesById(id: number) {
    try {
      const response = await pool.query(
        "select * from categories where id = $1",
        [id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async updateCategory(id: number, body: any) {
    try {
      const response = await pool.query(
        "update categories set cat_name = $1 where id = $2 returning *",
        [body.cat_name, id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async deleteCategories(id: number) {
    try {
      const response = await pool.query(
        "DELETE from categories where id = $1 returning *",
        [id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }
}
