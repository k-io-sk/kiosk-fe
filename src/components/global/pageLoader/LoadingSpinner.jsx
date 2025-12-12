import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 48 }) => {
  return <ClipLoader size={size} color='#005278' speedMultiplier={0.9} />;
};

export default LoadingSpinner;
