import { TIngredient } from '@utils-types';
import {
  getIngredientsThunk,
  sliceIngridients,
  TinitialState
} from './sliceIngridient';

const initialState: TinitialState = {
  ingridients: [],
  error: false,
  isLoading: false
};

const main: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const sauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('sliceIngridient test', () => {
  it('getIngredientsThunk pending test', () => {
    const state = sliceIngridients.reducer(
      { ...initialState },
      getIngredientsThunk.pending('')
    );

    expect(state.isLoading).toEqual(true);
  });

  it('getIngredientsThunk rejected test', () => {
    const state = sliceIngridients.reducer(
      { ...initialState, isLoading: true },
      getIngredientsThunk.rejected(new Error('Error'), '')
    );

    expect(state.isLoading).toEqual(false);
  });

  it('getIngredientsThunk fullfiled test', () => {
    const state = sliceIngridients.reducer(
      { ...initialState },
      getIngredientsThunk.fulfilled([sauce, main], '')
    );

    expect(state.ingridients).toEqual([sauce, main]);
  });
});
