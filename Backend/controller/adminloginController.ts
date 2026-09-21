import { Body, JsonController, Post } from "routing-controllers";
import { AdminLoginService } from "../service/adminloginService.js";

@JsonController("/adminlogin")
export class AdminLoginControlller {
  private adminloginService = new AdminLoginService();
  @Post("/")
  adminLogin(@Body() body: any) {
    try {
      return this.adminloginService.adminLoginserv(body);
    } catch (error) {
      return error;
    }
  }
}
