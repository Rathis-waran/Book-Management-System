import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";

import { CategoriesService } from "../service/categoriesService.js";

@JsonController("/categories")
export class CategoriesController {
  private categoriesService = new CategoriesService();

  @Post("/")
  createCategory(@Body() body: any) {
    try {
      return this.categoriesService.addCategory(body);
    } catch (error) {
      return error;
    }
  }
  @Get("/")
  getAllCategory() {
    try {
      return this.categoriesService.getAllCategory();
    } catch (error) {
      return error;
    }
  }
  @Get("/:id")
  getCategorysById(@Param("id") id: number) {
    try {
      return this.categoriesService.getCategoryById(id);
    } catch (error) {
      return error;
    }
  }

  @Put("/updatecategories/:id")
  updateCategory(@Param("id") id: number, @Body() body: any) {
    try {
      return this.categoriesService.updateCategoryById(id, body);
    } catch (error) {
      return error;
    }
  }

  @Delete("/delete/:id")
  deleteCategory(@Param("id") id: number) {
    try {
      return this.categoriesService.deleteCategory(id);
    } catch (error) {
      return error;
    }
  }
}
