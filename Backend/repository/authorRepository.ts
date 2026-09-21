import { pool } from "../db/db.js";

export class AuthorRepository {
  async addAuthors(body: any) {
    try {
      const response = await pool.query(
        "insert into authors (name) values ($1) returning *",
        [body.name],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async getAllAuthors() {
    try {
      const response = await pool.query("select * from authors");
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async getAuthorsById(id: number) {
    try {
      const response = await pool.query("select * from authors where id = $1", [
        id,
      ]);
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async updateAuthorById(id: number, body: any) {
    try {
      const response = await pool.query(
        "update authors set name = $1 where id = $2 returning *",
        [body.name, id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }

  async deleteAuthor(id: number) {
    try {
      const response = await pool.query(
        "delete from authors where id = $1 returning *",
        [id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }
}
