import * as authActions from "../constants/auth";
import Cookie from "js-cookie";

export const userLogin = (userObj) => {
  return {
    type: authActions.LOGIN_USER,
    payload: {
      userObj,
    }
  };
};

export const userLoginSuccess = userObj => {

  return {
    type: authActions.LOGIN_USER_SUCCESS,
    payload: {
      userObj,
    },
  };
};

export const userLoginFailed = error => {
  return {
    type: authActions.LOGIN_USER_FAILED,
    payload: {
      error,
    },
  };
};

export const userRegister = (userObj) => {
  return {
    type: authActions.REGISTER_USER,
    payload: {
      userObj,
    }
  };
};

export const userRegisterSuccess = userObj => {
  return {
    type: authActions.REGISTER_USER_SUCCESS,
    payload: {
      userObj,
    },
  };
};

export const userRegisterFailed = error => {
  return {
    type: authActions.REGISTER_USER_FAILED,
    payload: {
      error,
    },
  };
};

export const userLogout = () => {
  return (dispatch) => {
    const token = Cookie.get("accessToken");
    if (token) {
      Cookie.remove("accessToken");
      dispatch(userLogoutSuccess());
    }
  };
};

export const userLogoutSuccess = () => {
  return {
    type: authActions.LOGOUT_USER_SUCCESS,
  }
}
