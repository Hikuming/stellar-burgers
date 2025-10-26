import { rootReducer } from './store';
import store from './store';

describe('testing rootReducer', () => {
  test('initializing test', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});
