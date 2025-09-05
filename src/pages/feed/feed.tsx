import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedThunk, selectFeedOrders } from '../../services/sliceFeed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
