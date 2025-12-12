import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const isMobileDevice = () => {
  const widthOk = window.matchMedia('(max-width: 768px)').matches;
  const touchOk = navigator.maxTouchPoints > 0;
  return widthOk || touchOk;
};

const MobileOnlyRoute = ({ children, redirectTo = '/' }) => {
  const location = useLocation();

  if (!isMobileDevice()) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }
  return children;
};

MobileOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default MobileOnlyRoute;
