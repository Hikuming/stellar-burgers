import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { sliceIngridients } from './sliceIngridient';
import { sliceBurgerConstructor } from './sliceBurger';
import { sliceUser } from './sliceUser';
import { sliceOrders } from './sliceOrders';
import sliceFeed from './sliceFeed';

export const rootReducer = combineReducers({
  [sliceIngridients.name]: sliceIngridients.reducer,
  [sliceBurgerConstructor.name]: sliceBurgerConstructor.reducer,
  [sliceUser.name]: sliceUser.reducer,
  [sliceOrders.name]: sliceOrders.reducer,
  [sliceFeed.name]: sliceFeed.reducer
});

const store = configureStore({
  reducer: rootReducer
  // devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
