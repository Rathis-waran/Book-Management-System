import { Body, Get, JsonController, Post } from "routing-controllers";
import { OrderService } from "../service/orderService.js";

@JsonController("/order")
export class OrderController {
  private orderService = new OrderService();

  @Post("/")
  addOrder(@Body() body: any) {
    return this.orderService.addOrder(body);
  }

  @Get("/allorders")
  getallorders() {
    return this.orderService.getallorders();
  }
}
