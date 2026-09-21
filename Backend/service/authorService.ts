import { AuthorRepository } from "../repository/authorRepository.js";

export class AuthorService {
  private authorRepository = new AuthorRepository();
  addAuthor(body: any) {
    try {
      return this.authorRepository.addAuthors(body);
    } catch (error) {
      return error;
    }
  }

  getAllAuthor() {
    try {
      return this.authorRepository.getAllAuthors();
    } catch (error) {
      return error;
    }
  }

  getAuthorById(id: number) {
    try {
      return this.authorRepository.getAuthorsById(id);
    } catch (error) {
      return error;
    }
  }

  authorService(id: number, body: any) {
    try {
      return this.authorRepository.updateAuthorById(id, body);
    } catch (error) {
      return error;
    }
  }

  deleteAuthors(id: number) {
    try {
      return this.authorRepository.deleteAuthor(id);
    } catch (error) {
      return error;
    }
  }
}
