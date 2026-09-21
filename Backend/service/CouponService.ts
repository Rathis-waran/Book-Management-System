import { CoupnRepository } from "../repository/CouponRepository.js";

export class CouponService {
  private couponrepository = new CoupnRepository();

  getAllCoupon() {
    try {
      return this.couponrepository.getAllCoupon();
    } catch (error) {
      return error;
    }
  }

  updateCouponStatus(coupon_id: number) {
    try {
      return this.couponrepository.updateCouponStatus(coupon_id);
    } catch (error) {
      return error;
    }
  }
}
