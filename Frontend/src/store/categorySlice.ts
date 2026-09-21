import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addcategories, deleteCategory, fetchcategory } from "../api/apis";

interface Category {
  id: number;
  cat_name: string;
}

interface AdminState {
  categoy: Category[];
  loading: boolean;
  error: string;
}

const initialState: AdminState = {
  categoy: [],
  loading: false,
  error: "",
};

export const addcategory = createAsyncThunk(
  "categoy/addcategoy",
  async (category: { cat_name: string }) => {
    try {
      await addcategories(category);
    } catch (error) {
      return error;
    }
  },
);

export const deleteCategories = createAsyncThunk(
  "category/categoryDelete",
  async (categoryId: number) => {
    try {
      window.confirm("Want To delete the Cateory");
      return await deleteCategory(categoryId);
    } catch (error) {
      return error;
    }
  },
);

export const fetchCategories = createAsyncThunk<Category[] | any>(
  "category/fetchCategories",
  async () => {
    try {
      return await fetchcategory();
    } catch (error) {
      return error;
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(addcategory.pending, (state) => {
      state.loading = true;
    });

    builders.addCase(addcategory.fulfilled, (state) => {
      state.loading = false;
    });

    builders.addCase(addcategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Not able to Add Category";
    });
    builders.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categoy = action.payload;
      state.error = "";
    });
    builders.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Category";
    });

    builders.addCase(deleteCategories.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(deleteCategories.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builders.addCase(deleteCategories.rejected, (state) => {
      state.loading = false;
      state.error = "Not able to Get Author";
    });
  },
});

export default categorySlice.reducer;
