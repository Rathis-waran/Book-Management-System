import { BookRepository } from "../repository/bookRepository.js";

export class BookService {
  private bookRepository = new BookRepository();
  getAll(page: number, limit: number, search: string) {
    try {
      return this.bookRepository.getAllBooks(page, limit, search);
    } catch (error) {
      return error;
    }
  }

  addBook(body: any) {
    try {
      return this.bookRepository.addBooks(body);
    } catch (error) {
      return error;
    }
  }

  getById(id: number) {
    try {
      return this.bookRepository.getBooksById(id);
    } catch (error) {
      return error;
    }
  }
  updateBooks(id: number, body: any) {
    try {
      return this.bookRepository.updateBook(id, body);
    } catch (error) {
      return error;
    }
  }
  deleteBooks(id: number) {
    try {
      return this.bookRepository.deleteBook(id);
    } catch (error) {
      return error;
    }
  }
  reduceStock(bookId: number, quantity: number) {
    try {
      return this.bookRepository.reduceStock(bookId, quantity);
    } catch (error) {
      return error;
    }
  }
}
