import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from './../utils/types';
import { getFeedsApi } from '@api';

export type TsliceFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TsliceFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const getFeedThunk = createAsyncThunk('feed/getFeed', getFeedsApi);

export const sliceFeed = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday
  }
});

export default sliceFeed;

export const { selectFeedOrders, selectFeedTotal, selectFeedTotalToday } =
  sliceFeed.selectors;
