import sliceUser, {
  getUserThunk,
  registerUserThunk,
  loginUserThunk,
  logoutThunk,
  updateUserThunk,
  TauthUser
} from './sliceUser';

const initialState: TauthUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
    email: 'test@mail.ru',
    name: 'test'
  },
  accessToken: 'test',
  refreshToken: 'test'
};

const logInData = {
  email: 'test@mail.ru',
  password: 'test'
};

const testRegisterUser = {
  email: 'test@mail.ru',
  name: 'test',
  password: 'password'
};

const logInDataSuccess = {
  success: true,
  user: {
    email: 'test@mail.ru',
    name: 'test'
  }
};

describe('sliceOrders test', () => {
  it('getUserThunk pending test', () => {
    const state = sliceUser.reducer(
      { ...initialState },
      getUserThunk.pending('')
    );

    expect(state.loginUserRequest).toEqual(true);
  });

  it('getUserThunk rejected test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true },
      getUserThunk.rejected(new Error('Error'), '')
    );

    expect(state.isAuthChecked).toEqual(true);
    expect(state.loginUserRequest).toEqual(false);
  });

  it('getUserThunk fullfiled test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true },
      getUserThunk.fulfilled(logInDataSuccess, '')
    );
    console.log(state.user);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(logInDataSuccess.user);
    expect(state.isAuthenticated).toEqual(true);
    expect(state.loginUserRequest).toEqual(false);
  });

  it('registerUserThunk pending test', () => {
    const state = sliceUser.reducer(
      { ...initialState },
      registerUserThunk.pending('', testRegisterUser)
    );

    expect(state.loginUserRequest).toEqual(true);
  });

  it('registerUserThunk rejected test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true, isAuthenticated: true },
      registerUserThunk.rejected(new Error('Error'), '', testRegisterUser)
    );

    expect(state.isAuthenticated).toEqual(false);
    expect(state.loginUserRequest).toEqual(false);
  });

  it('registerUserThunk fullfiled test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true, isAuthenticated: true },
      registerUserThunk.fulfilled(logInDataSuccess.user, '', testRegisterUser)
    );

    expect(state.isAuthenticated).toEqual(true);
    expect(state.user).toEqual(logInDataSuccess.user);
    expect(state.loginUserRequest).toEqual(false);
  });

  it('loginUserThunk pending test', () => {
    const state = sliceUser.reducer(
      { ...initialState },
      loginUserThunk.pending('', testRegisterUser)
    );

    expect(state.loginUserRequest).toEqual(true);
  });

  it('loginUserThunk rejected test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true, isAuthChecked: false },
      loginUserThunk.rejected(new Error('Error'), '', testRegisterUser)
    );

    expect(state.loginUserRequest).toEqual(false);
    expect(state.isAuthChecked).toEqual(true);
  });

  it('loginUserThunk fullfiled test', () => {
    const state = sliceUser.reducer(
      {
        ...initialState,
        loginUserRequest: true,
        isAuthenticated: false,
        isAuthChecked: false
      },
      loginUserThunk.fulfilled(logInDataSuccess.user, '', testRegisterUser)
    );

    expect(state.isAuthenticated).toEqual(true);
    expect(state.user).toEqual(logInDataSuccess.user);
    expect(state.loginUserRequest).toEqual(false);
    expect(state.isAuthChecked).toEqual(true);
  });

  it('logoutThunk pending test', () => {
    const state = sliceUser.reducer(
      { ...initialState },
      logoutThunk.pending('')
    );

    expect(state.isAuthenticated).toEqual(true);
    expect(state.loginUserRequest).toEqual(true);
  });

  it('logoutThunk rejected test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true, isAuthenticated: true },
      logoutThunk.rejected(new Error('Error'), '')
    );

    expect(state.loginUserRequest).toEqual(false);
    expect(state.isAuthenticated).toEqual(false);
  });

  it('logoutThunk fullfiled test', () => {
    const state = sliceUser.reducer(
      {
        ...initialState,
        loginUserRequest: true,
        isAuthenticated: true,
        user: { email: 'test', name: 'test' }
      },
      logoutThunk.fulfilled(undefined, '')
    );

    expect(state.isAuthenticated).toEqual(false);
    expect(state.user).toEqual(null);
    expect(state.loginUserRequest).toEqual(false);
  });

  it('updateUserThunk pending test', () => {
    const state = sliceUser.reducer(
      { ...initialState },
      updateUserThunk.pending('', testRegisterUser)
    );

    expect(state.isAuthenticated).toEqual(true);
    expect(state.loginUserRequest).toEqual(true);
  });

  it('updateUserThunk rejected test', () => {
    const state = sliceUser.reducer(
      { ...initialState, loginUserRequest: true },
      updateUserThunk.rejected(new Error('Error'), '', testRegisterUser)
    );

    expect(state.loginUserRequest).toEqual(false);
  });

  it('updateUserThunk fullfiled test', () => {
    const state = sliceUser.reducer(
      {
        ...initialState,
        loginUserRequest: true,
        isAuthenticated: false,
      },
      updateUserThunk.fulfilled(logInDataSuccess, '', testRegisterUser)
    );

    expect(state.isAuthenticated).toEqual(true);
    expect(state.user).toEqual(logInDataSuccess.user);
    expect(state.loginUserRequest).toEqual(false);
  });

});
