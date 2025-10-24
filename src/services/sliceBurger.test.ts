import { TConstructorIngredient } from '@utils-types';
import {
  addIngridient,
  clearOrder,
  deleteIngridient,
  moveDownIngridient,
  moveUpIngridient,
  sliceBurgerConstructor,
  TsliceBurgerConstructor
} from './sliceBurger';

const bun: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa093c',
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const main: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0941',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const sauce: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0943',
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
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
describe('sliceBurger tests', () => {
  it('addIngridient', () => {
    const newState = sliceBurgerConstructor.reducer(
      initialState,
      addIngridient(main)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  it('addIngridientBun', () => {
    const newState = sliceBurgerConstructor.reducer(
      initialState,
      addIngridient(bun)
    );
    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('deleteIngridient', () => {
    const initialState: TsliceBurgerConstructor = {
      constructorItems: {
        bun: null,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      isLoading: false
    };

    const newState = sliceBurgerConstructor.reducer(
      initialState,
      deleteIngridient(main)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
  });

  it('moveUpIngridient and moveDownIngridient', () => {
    const initialState: TsliceBurgerConstructor = {
      constructorItems: {
        bun: null,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      isLoading: false
    };

    const newStateUp = sliceBurgerConstructor.reducer(
      initialState,
      moveUpIngridient(1)
    );

    expect(newStateUp.constructorItems.ingredients[0].type).toEqual('sauce'); //соус стал первым

    const newStateDown = sliceBurgerConstructor.reducer(
      initialState,
      moveDownIngridient(1)
    );

    expect(newStateDown.constructorItems.ingredients[0].type).toEqual('main'); //начинка снова стала первой
  });
  it('clearOrder', () => {
    const initialState: TsliceBurgerConstructor = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      isLoading: false
    };

    const newStateClear = sliceBurgerConstructor.reducer(
      initialState,
      clearOrder()
    );

    expect(newStateClear.constructorItems.bun).toBe(null); //булок нет
    expect(newStateClear.constructorItems.ingredients).toEqual([]); //ингридиентов нет
  });
});
