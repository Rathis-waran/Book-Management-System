import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import { OrderService } from "../service/orderService.js";

@JsonController("/order")
export class OrderController {
  private orderService = new OrderService();

  @Post("/")
  addOrder(@Body() body: any) {
    return this.orderService.addOrder(body);
  }

  @Get("/allorders")
  getallorders(
    @QueryParam("page") page: string = "1",
    @QueryParam("limit") limit: string = "10",
  ) {
    return this.orderService.getallorders(Number(page), Number(limit));
  }
}
