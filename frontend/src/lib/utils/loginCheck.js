const checkLogin = (currentUser) => {
  return !currentUser ? false : true;
};

export default checkLogin;
