import "reflect-metadata";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
} from "routing-controllers";
import { BookService } from "../service/bookService.js";

@JsonController("/books")
export class BookController {
  private bookService = new BookService();
  @Get("/")
  getAllBooks(
    @QueryParam("page") page: string = "1",
    @QueryParam("limit") limit: string = "8",
    @QueryParam("search") search: string,
  ) {
    try {
      return this.bookService.getAll(Number(page), Number(limit), search);
    } catch (error) {
      return error;
    }
  }
  @Post("/")
  createBooks(@Body() body: any) {
    try {
      return this.bookService.addBook(body);
    } catch (error) {
      return error;
    }
  }
  @Get("/:id")
  getBooksById(@Param("id") id: number) {
    try {
      return this.bookService.getById(id);
    } catch (error) {
      return error;
    }
  }
  @Put("/updatebooks/:id")
  updateBook(@Param("id") id: number, @Body() body: any) {
    try {
      return this.bookService.updateBooks(id, body);
    } catch (error) {
      return error;
    }
  }
  @Delete("/delete/:id")
  deleteBook(@Param("id") id: number) {
    try {
      return this.bookService.deleteBooks(id);
    } catch (error) {
      return error;
    }
  }

  @Put("/updatestock/:id")
  reduceStock(@Param("id") id: number, @Body() body: { quantity: number }) {
    try {
      return this.bookService.reduceStock(body.quantity, id);
    } catch (error) {
      return error;
    }
  }
}
