import { CartRepository } from "../repository/cartRepository.js";

export class CartService {
  private cartRepository = new CartRepository();

  async getcartItem() {
    try {
      return await this.cartRepository.getcartItem();
    } catch (error) {
      return error;
    }
  }
  async getCartById(cart_id: number) {
    try {
      return await this.cartRepository.getcartById(cart_id);
    } catch (error) {
      return error;
    }
  }

  async createCart() {
    try {
      return await this.cartRepository.createCart();
    } catch (error) {
      return error;
    }
  }

  async getallcart() {
    try {
      return await this.cartRepository.getallcart();
    } catch (error) {
      return error;
    }
  }

  async addToCart(cart_id: number, book_id: number, quantity: number) {
    try {
      return await this.cartRepository.addToCart(cart_id, book_id, quantity);
    } catch (error) {
      return error;
    }
  }
  async updateCart(id: number, quantity: number) {
    try {
      return await this.cartRepository.updateCart(id, quantity);
    } catch (error) {
      return error;
    }
  }

  async deleteCart(id: number) {
    try {
      return await this.cartRepository.deleteCart(id);
    } catch (error) {
      return error;
    }
  }

  async getCart(cart_id: number) {
    try {
      return await this.cartRepository.getCart(cart_id);
    } catch (error) {
      return error;
    }
  }

  async clearCart(cart_id: number) {
    try {
      return await this.cartRepository.clearCart(cart_id);
    } catch (error) {
      return error;
    }
  }
}
