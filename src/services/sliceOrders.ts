import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from './../utils/types';
import { getOrdersApi } from '@api';

export type TsliceOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TsliceOrders = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const getOrdersThunk = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const sliceOrders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
  },
  selectors: {
    selectOrders: (state) => state.orders
  }
});

export default sliceOrders;

export const { selectOrders } = sliceOrders.selectors;
