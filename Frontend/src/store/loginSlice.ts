import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../api/apis";

const initialState = {
  token: null,
  email: null,
  loading: false,
};

export interface login {
  email: string;
  password: string;
}

export const adminlogin = createAsyncThunk(
  "auth/adminlogin",
  async ({ email, password }: login) => {
    try {
      return adminLogin(email, password);
    } catch (error) {
      alert("Enter the correct Credentials!!!");
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },

  extraReducers: (builders) => {
    builders.addCase(adminlogin.pending, (state) => {
      state.loading = true;
    });

    builders.addCase(adminlogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
    });

    builders.addCase(adminlogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
