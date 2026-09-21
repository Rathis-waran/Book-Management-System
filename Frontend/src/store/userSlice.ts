import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBooks } from "../api/apis";

interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
  price: number;
  stock: number;
  image_url: string;
}

interface UserState {
  books: Book[];
  totalBooks: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string;
}
const initialState: UserState = {
  books: [],
  totalBooks: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: "",
};

export const fetchBooks = createAsyncThunk(
  "user/fetchBooks",
  async ({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) => {
    try {
      return await addBooks(page, limit, search);
    } catch (error) {
      console.error(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.books = [];
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;

        state.books = action.payload.books;
        state.totalBooks = action.payload.totalBooks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = "Book not Found";
      });
  },
});

export const { clearBooks } = userSlice.actions;

export default userSlice.reducer;
