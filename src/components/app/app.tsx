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
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      {/* <Route path='/login' element={<ProtectedRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/forgot-password' element={<ProtectedRoute />}>
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route path='/reset-password' element={<ProtectedRoute />}>
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>
      <Route path='/profile' element={<ProtectedRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/profile/orders' element={<ProtectedRoute />}>
        <Route path='/profile/orders' element={<ProfileOrders />} />
      </Route>
      <Route path='/register' element={<ProtectedRoute />}>
        <Route path='/register' element={<Register />} />
      </Route> */}
      <Route path='*' element={<NotFound404 />} />
      <Route
        path='/feed/:number'
        element={
          <Modal title={''} onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title={''} onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title={''} onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
