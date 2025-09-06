import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredientsThunk } from '../../services/sliceIngridient';
import { ProtectedRoute } from '../protectedRoute';
import { authChecked, checkUserAuth } from '../../services/sliceUser';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const locationState = location.state as { background?: Location };
  const background = locationState && locationState.background;

  const DetailPage = () => {
    const { number } = useParams();

    return (
      <div className={styles.detailPageWrap}>
        <p className={`text text_type_digits-default ${styles.detailHeader}`}>
          #{number}
        </p>
        <OrderInfo />
      </div>
    );
  };

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(checkUserAuth())
      .unwrap()
      .catch(() => {})
      .finally(() => authChecked());
  }, [dispatch]);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isPublic>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isPublic>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<DetailPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
