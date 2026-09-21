import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addOrders, getOrders } from "../api/apis";
import type { Order, OrderResp } from "../types/types";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({}),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    addOrder: builder.mutation<Order, OrderResp>({
      queryFn: async (order) => {
        const response = await addOrders(order);
        return {
          data: response,
        };
      },

      invalidatesTags: ["Order"],
    }),

    fetchOrders: builder.query<
      {
        orders: Order[];
        totalorders: number;
        orderpages: number;
      },
      {
        page: number;
        limit: number;
      }
    >({
      queryFn: async ({ page, limit }) => {
        const response = await getOrders(page, limit);
        return {
          data: response,
        };
      },
      providesTags: ["Order"],
    }),
  }),
});

export const { useAddOrderMutation, useFetchOrdersQuery } = orderApi;
