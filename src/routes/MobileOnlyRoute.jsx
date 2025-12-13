import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import isMobileDevice from '@utils/isMobileDevice';

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
