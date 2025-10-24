import sliceOrders, { getOrdersThunk, TsliceOrders } from "./sliceOrders";

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

const initialState: TsliceOrders = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

describe('sliceOrders test', () => {
  it('getOrdersThunk pending test', () => {
    const state = sliceOrders.reducer(
      { ...initialState },
      getOrdersThunk.pending('')
    );

    expect(state.isLoading).toEqual(true);
  });

  it('getOrdersThunk rejected test', () => {
    const state = sliceOrders.reducer(
      { ...initialState, isLoading: true },
      getOrdersThunk.rejected(new Error('Error'), '')
    );

    expect(state.isLoading).toEqual(false);
  });

  it('getOrdersThunk fullfiled test', () => {
    const state = sliceOrders.reducer(
      { ...initialState },
      getOrdersThunk.fulfilled(orderData.orders, '')
    );

    expect(state.orders).toEqual(orderData.orders);
  });
});