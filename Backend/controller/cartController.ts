import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "routing-controllers";

import { CartService } from "../service/cartService.js";

@JsonController("/cart")
export class CartController {
  private cartService = new CartService();

  @Get("/")
  async getcartItem() {
    try {
      return await this.cartService.getcartItem();
    } catch (error) {
      return error;
    }
  }

  @Get("/:cart_id")
  async getCartById(@Param("cart_id") cart_id: string) {
    try {
      return await this.cartService.getCartById(Number(cart_id));
    } catch (error) {
      return error;
    }
  }

  @Post("/")
  async createCart() {
    try {
      return await this.cartService.createCart();
    } catch (error) {
      return error;
    }
  }

  @Get("/getallcart")
  async getallcart() {
    try {
      return await this.cartService.getallcart();
    } catch (error) {
      return error;
    }
  }

  @Post("/item")
  async addToCart(
    @Body()
    body: {
      cart_id: number;
      book_id: number;
      quantity: number;
    },
  ) {
    try {
      const { cart_id, book_id, quantity } = body;
      return await this.cartService.addToCart(cart_id, book_id, quantity);
    } catch (error) {
      return error;
    }
  }

  @Put("/item/:id")
  async updateCartItem(
    @Param("id") id: string,
    @Body() body: { quantity: number },
  ) {
    try {
      return await this.cartService.updateCart(Number(id), body.quantity);
    } catch (error) {
      return error;
    }
  }

  @Delete("/item/:id")
  async deleteCart(@Param("id") id: string) {
    try {
      return await this.cartService.deleteCart(Number(id));
    } catch (error) {
      return error;
    }
  }

  @Delete("/:cart_id")
  async clearCart(@Param("cart_id") cart_id: string) {
    try {
      return await this.cartService.clearCart(Number(cart_id));
    } catch (error) {
      return error;
    }
  }

  @Get("/:cart_id/items")
  async getCart(@Param("cart_id") cart_id: string) {
    try {
      return await this.cartService.getCart(Number(cart_id));
    } catch (error) {
      return error;
    }
  }
}
