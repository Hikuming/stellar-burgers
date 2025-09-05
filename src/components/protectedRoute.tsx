import { useSelector } from '../services/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '../components/ui/preloader/preloader';
import { selectIsAuthChecked, selectUser } from '../services/sliceUser';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ isPublic, children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();
  console.log('ProtectedRoute отработал');

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isPublic && !user) {
    console.log(isPublic);
    console.log('не публичный и нет юзера');
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    console.log('публичный и есть юзер' + location.state?.from);
    return <Navigate replace to={from} />;
  }

  return children;
};
