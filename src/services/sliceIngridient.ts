import { getIngredientsApi } from './../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TinitialState = {
  ingridients: TIngredient[];
  error: boolean;
  isLoading: boolean;
};

const initialState: TinitialState = {
  ingridients: [],
  error: false,
  isLoading: false
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    console.log(response);
    return response;
  }
);

export const sliceIngridients = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingridients = action.payload;
    });
  },
  selectors: {
    getIngredientsBuns: (state) =>
      state.ingridients.filter((item) => item.type === 'bun'),
    getIngredientsMains: (state) =>
      state.ingridients.filter((item) => item.type === 'main'),
    getIngredientsSauces: (state) =>
      state.ingridients.filter((item) => item.type === 'sauce'),
    getIngredients: (state) => state.ingridients,
    getLoadingStatus: (state) => state.isLoading
  }
});

export const {
  getIngredientsBuns,
  getIngredientsMains,
  getIngredientsSauces,
  getIngredients,
  getLoadingStatus
} = sliceIngridients.selectors;
