import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/sliceIngridient';
import { useParams } from 'react-router-dom';
import { selectOrders } from '../../services/sliceOrders';
import {
  getFeedsOrderByNumberThunk,
  selectFeedOrders,
  selectFeedsOrderByNumber
} from '../../services/sliceFeed';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const { number } = useParams();
  const orders = useSelector(selectOrders);
  const feed = useSelector(selectFeedOrders);

  function findOrder(number: number) {
    console.log('find order выполнили по заказу номер - ' + number);
    if (Object.keys(feed).length === 0 && Object.keys(orders).length === 0) {
      return useSelector(selectFeedsOrderByNumber);
    }
    return (
      orders.find((order) => order.number === number) ||
      feed.find((order) => order.number === number)
    );
  }

  useEffect(() => {
    if (Object.keys(feed).length === 0 && Object.keys(orders).length === 0) {
      dispatch(getFeedsOrderByNumberThunk(Number(number)));
    }
  }, [dispatch]);

  const orderData = findOrder(Number(number));

  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
