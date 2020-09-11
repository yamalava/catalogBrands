const checkAuth = () => {
  return sessionStorage.getItem('accessToken') ? true : false;
};

export default checkAuth;
