export const userLoginSuccess = (user, token) => ({
    type: 'USER_LOGIN_SUCCESS',
    payload: { user, token },
  });

  export const userLogout = () => ({
    type: 'USER_LOGOUT',
  });