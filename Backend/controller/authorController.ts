import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { AuthorService } from "../service/authorService.js";

@JsonController("/author")
export class AuthorController {
  private authorService = new AuthorService();
  @Post("/")
  createAuthor(@Body() body: any) {
    try {
      return this.authorService.addAuthor(body);
    } catch (error) {
      return error;
    }
  }
  @Get("/")
  getAllAuthors() {
    try {
      return this.authorService.getAllAuthor();
    } catch (error) {
      return error;
    }
  }
  @Get("/:id")
  getAuthorsById(@Param("id") id: number) {
    try {
      return this.authorService.getAuthorById(id);
    } catch (error) {
      return error;
    }
  }

  @Put("/updateauthors/:id")
  updateAuthor(@Param("id") id: number, @Body() body: any) {
    try {
      return this.authorService.authorService(id, body);
    } catch (error) {
      return error;
    }
  }

  @Delete("/delete/:id")
  deleteAuthor(@Param("id") id: number) {
    try {
      return this.authorService.deleteAuthors(id);
    } catch (error) {
      return error;
    }
  }
}
