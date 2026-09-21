import { CategoriesRepository } from "../repository/categoriesRepository.js";

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository();

  addCategory(body: any) {
    try {
      return this.categoriesRepository.addCategories(body);
    } catch (error) {
      return error;
    }
  }

  getAllCategory() {
    try {
      return this.categoriesRepository.getAllCategories();
    } catch (error) {
      return error;
    }
  }

  getCategoryById(id: number) {
    try {
      return this.categoriesRepository.getCategoriesById(id);
    } catch (error) {
      return error;
    }
  }

  updateCategoryById(id: number, body: any) {
    try {
      return this.categoriesRepository.updateCategory(id, body);
    } catch (error) {
      return error;
    }
  }

  deleteCategory(id: number) {
    try {
      return this.categoriesRepository.deleteCategories(id);
    } catch (error) {
      return error;
    }
  }
}
