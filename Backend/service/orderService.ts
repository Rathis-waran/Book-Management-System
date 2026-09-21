import { OrderRepository } from "../repository/orderRepository.js";

export class OrderService {
  private orderRepository = new OrderRepository();

  addOrder(order: any) {
    return this.orderRepository.addOrder(order);
  }

  getallorders() {
    return this.orderRepository.getallorders();
  }
}
