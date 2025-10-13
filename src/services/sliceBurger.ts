import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TsliceBurgerConstructor = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
};

const initialState: TsliceBurgerConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isLoading: false
};

export const orderBurgerThunk = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

//добавить ингридиенты, удалить ингридиенты, сделать заказ

export const sliceBurgerConstructor = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngridient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    deleteIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveUpIngridient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.constructorItems.ingredients.length) {
        const newIngredients = [...state.constructorItems.ingredients];

        [newIngredients[index - 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index - 1]
        ];

        return {
          ...state,
          constructorItems: {
            ...state.constructorItems,
            ingredients: newIngredients
          }
        };
      }
    },
    moveDownIngridient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.constructorItems.ingredients.length - 1) {
        const newIngredients = [...state.constructorItems.ingredients];

        [newIngredients[index + 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index + 1]
        ];

        return {
          ...state,
          constructorItems: {
            ...state.constructorItems,
            ingredients: newIngredients
          }
        };
      }
    },
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getLoading: (state) => state.isLoading
  }
});

export const {
  addIngridient,
  deleteIngridient,
  clearOrder,
  moveUpIngridient,
  moveDownIngridient
} = sliceBurgerConstructor.actions;

export const {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  getLoading
} = sliceBurgerConstructor.selectors;
