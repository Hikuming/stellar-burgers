import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';

import { TRegisterData } from '../utils/burger-api';

export type TauthUser = {
  isAuthChecked: boolean; //флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  user: TUser | null; //null, если пользователь не авторизован
  loginUserRequest: boolean; // Флаг для состояния запроса логина
};

const initialState: TauthUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserRequest: false
};

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi); // получаем пользователя

export const registerUserThunk = createAsyncThunk(
  //регистрируем пользователя, передаём мыло пас и имя
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  // логиним пользователя передаём из формы мыло и пас
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  // выходим из под пользователя, сразу удаляем куку и чистим хранилище
  try {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.clear();
  } catch (error) {
    return console.log(error);
  }
});

export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);

export const sliceUser = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.loginUserRequest = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectloginUserRequest: (state) => state.loginUserRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUserThunk()).finally(() => {
        dispatch(authChecked()); //непонятно - переписать
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = sliceUser.actions;
export default sliceUser;

export const {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthChecked,
  selectloginUserRequest
} = sliceUser.selectors;
