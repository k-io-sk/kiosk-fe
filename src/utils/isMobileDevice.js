const isMobileDevice = () => {
  return window.matchMedia('(max-width: 768px)').matches;
};

export default isMobileDevice;
