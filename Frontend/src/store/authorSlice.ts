import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addauthor, deleteAuthor, fetchAuthor } from "../api/apis";

interface Author {
  id: number;
  name: string;
}

interface AdminState {
  author: Author[];
  loading: boolean;
  error: string;
}

const initialState: AdminState = {
  author: [],
  loading: false,
  error: "",
};

export const addAuthor = createAsyncThunk(
  "author/addAuthor",
  async (name: any) => {
    try {
      await addauthor(name);
    } catch (error) {
      return error;
    }
  },
);

export const deleteAuthors = createAsyncThunk(
  "author/authorDelete",
  async (authorId: number) => {
    await deleteAuthor(authorId);
  },
);

export const fetchAuthors = createAsyncThunk<Author[] | any>(
  "admin/fetchAuthors",
  async () => {
    try {
      return await fetchAuthor();
    } catch (error) {
      return error;
    }
  },
);

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(addAuthor.pending, (state) => {
      state.loading = true;
    });

    builders.addCase(addAuthor.fulfilled, (state) => {
      state.loading = false;
    });

    builders.addCase(addAuthor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Not able to Add Author";
    });
    builders.addCase(fetchAuthors.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.loading = false;
      state.author = action.payload;
      state.error = "";
    });
    builders.addCase(fetchAuthors.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Author";
    });

    builders.addCase(deleteAuthors.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(deleteAuthors.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builders.addCase(deleteAuthors.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Author";
    });
  },
});

export default authorSlice.reducer;
