import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addbooks, deleteBooks, reduceStock } from "../api/apis";

interface AdminState {
  loading: boolean;
  error: string;
}

export interface BookData {
  title: string;
  price: number;
  stock: number;
  author_id: number;
  category_id: number;
  image_url: string;
}

const initialState: AdminState = {
  loading: false,
  error: "",
};

export const addbook = createAsyncThunk("admin/addBooks", async (bookData) => {
  try {
    await addbooks(bookData);
    alert("Book Add Successfully");
  } catch (error) {
    alert("unable to add the book");
    return error;
  }
});

export const deletebook = createAsyncThunk<any, number>(
  "admin/deleteBook",
  async (bookId: number) => {
    try {
      await deleteBooks(bookId);
    } catch (error) {
      return error;
    }
  },
);

export const reduceStocks = createAsyncThunk(
  "books/reduceStock",
  async ({ bookId, quantity }: { bookId: number; quantity: number }) => {
    try {
      const response = await reduceStock(bookId, quantity);

      return response;
    } catch (error) {
      return error;
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(addbook.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(addbook.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builders.addCase(addbook.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Author";
    });
    builders.addCase(deletebook.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builders.addCase(deletebook.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Author";
    });
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
