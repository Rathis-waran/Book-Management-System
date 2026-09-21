import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoupon, updatedStatus } from "../api/apis";

interface Coupon {
  id: number;
  couponcode: string;
  discountpercentage: number;
  status: boolean;
}

interface CouponState {
  coupon: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupon: [],
  loading: false,
  error: null,
};

export const getCoupon = createAsyncThunk("coupon/getCoupon", async () => {
  try {
    return await fetchCoupon();
  } catch (error) {
    console.error(error);
  }
});

export const updateStatus = createAsyncThunk(
  "coupon/updateStatus",
  async (id: number) => {
    return await updatedStatus(id);
  },
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.coupon = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })

      .addCase(getCoupon.rejected, (state) => {
        state.loading = false;
        state.error = "coupon not Found";
      });
    builder
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
        state.error = "coupon not Found";
      });
  },
});

export default couponSlice.reducer;
