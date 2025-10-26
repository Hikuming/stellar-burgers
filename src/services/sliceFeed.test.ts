import sliceFeed, { getFeedsOrderByNumberThunk, getFeedThunk, TsliceFeed } from './sliceFeed';

const initialState: TsliceFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  orderByNum: null
};

const orderData = {
  success: true,
  orders: [
    {
      _id: '68f9202474993f001b5ba8fe',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-10-22T18:19:16.275Z',
      updatedAt: '2025-10-22T18:19:24.309Z',
      number: 91857
    },
    {
      _id: '68f91b8274993f001b5ba8f4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-10-22T17:59:30.215Z',
      updatedAt: '2025-10-22T17:59:31.469Z',
      number: 91856
    }
  ],
  total: 500,
  totalToday: 600
};

describe('sliceFeed tests', () => {
  it('test pending getFeed', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedThunk.pending('')
    );

    expect(state.isLoading).toEqual(true);
  });

  it('test rejected getFeed', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedThunk.rejected(new Error('Error'), '')
    );

    expect(state.isLoading).toEqual(false);
  });

  it('test fulfilled getFeed', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedThunk.fulfilled(orderData, '')
    );

    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(orderData.orders);
    expect(state.total).toEqual(orderData.total);
    expect(state.totalToday).toEqual(orderData.totalToday);
  });

  it('test pending getFeedsOrderByNumberThunk', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedsOrderByNumberThunk.pending('', 0)
    );

    expect(state.isLoading).toEqual(true);
  });

  it('test rejected getFeedsOrderByNumberThunk', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedsOrderByNumberThunk.rejected(new Error('Error'),'', 0)
    );

    expect(state.isLoading).toEqual(false);
  });

  it('test fulfilled getFeedsOrderByNumberThunk', () => {
    const state = sliceFeed.reducer(
      { ...initialState },
      getFeedsOrderByNumberThunk.fulfilled(orderData, '',0)
    );

    expect(state.isLoading).toEqual(false);
    expect(state.orderByNum).toEqual(orderData.orders[0]);
  });
});
