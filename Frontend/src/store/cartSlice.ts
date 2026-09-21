import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  cleanCarts,
  deleteCartItem,
  fetchCartItems,
  updateCartItem,
} from "../api/apis";

interface CartItem {
  id: number;
  cart_id: number;
  book_id: number;
  quantity: number;
  image_url: string;
  price: number;
  title: string;
  stock: number;
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (cartId: number) => {
    try {
      const response = await fetchCartItems(cartId);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      const response = await updateCartItem({
        id,
        quantity,
      });
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (id: number) => {
    try {
      await deleteCartItem(id);
      return id;
    } catch (error) {
      return error;
    }
  },
);

export const cleanUpCart = createAsyncThunk(
  "cart/cleanCart",
  async (id: number) => {
    const response = await cleanCarts(id);
    return response;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder;
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      const updatedItem = action.payload;
      const item = state.cartItems.find((item) => item.id === updatedItem.id);
      if (item) {
        item.quantity = updatedItem.quantity;
      }
    });

    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    });

    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(cleanUpCart.fulfilled, (state) => {
      state.cartItems = [];
    });

    builder.addCase(cleanUpCart.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default cartSlice.reducer;
