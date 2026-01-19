import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 48 }) => {
  return <ClipLoader size={size} color='#111' speedMultiplier={1} />;
};

export default LoadingSpinner;
