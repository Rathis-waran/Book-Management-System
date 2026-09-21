import { Get, JsonController, Param, Put } from "routing-controllers";
import { CouponService } from "../service/CouponService.js";

@JsonController("/coupon")
export class CouponController {
  private couponService = new CouponService();
  @Get("/")
  getAllCoupon() {
    try {
      return this.couponService.getAllCoupon();
    } catch (error) {
      return error;
    }
  }

  @Put("/:id")
  updateCouponStatus(@Param("id") coupon_id: number) {
    return this.couponService.updateCouponStatus(coupon_id);
  }
}
