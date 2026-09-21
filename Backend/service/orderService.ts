import { OrderRepository } from "../repository/orderRepository.js";

export class OrderService {
  private orderRepository = new OrderRepository();

  addOrder(order: any) {
    return this.orderRepository.addOrder(order);
  }

  getallorders(page: number, limit: number) {
    return this.orderRepository.getallorders(page, limit);
  }
}
