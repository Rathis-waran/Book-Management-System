import { pool } from "../db/db.js";

export class CoupnRepository {
  async getAllCoupon() {
    try {
      const response = await pool.query(
        "select * from coupon where status = true",
      );
      return response.rows;
    } catch (error) {
      return error;
    }
  }

  async updateCouponStatus(coupon_id: number) {
    try {
      console.log(coupon_id);
      const response = await pool.query(
        "update coupon set status = false where id = $1 RETURNING *",
        [coupon_id],
      );
      return response.rows[0];
    } catch (error) {
      return error;
    }
  }
}
