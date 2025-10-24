import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from './../utils/types';
// import { getFeedsApi, getOrderByNumberApi } from '@api';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';

export type TsliceFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  orderByNum: TOrder | null;
};

const initialState: TsliceFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  orderByNum: null
};

export const getFeedsOrderByNumberThunk = createAsyncThunk(
  'feed/getOrderByNum',
  async (nubmer: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(nubmer);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

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
    builder.addCase(getFeedsOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedsOrderByNumberThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedsOrderByNumberThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderByNum = action.payload.orders[0];
    });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday,
    selectFeedsOrderByNumber: (state) => state.orderByNum
  }
});

export default sliceFeed;

export const {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedsOrderByNumber
} = sliceFeed.selectors;
