import * as authActions from "../constants/auth";
import Cookie from "js-cookie";

export const userLogin = (userObj) => {
  return {
    type: authActions.LOGIN_USER,
    payload: {
      userObj,
    },
  };
};

export const userLoginSuccess = (data) => {
  return {
    type: authActions.LOGIN_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const userLoginFailed = (error) => {
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
    },
  };
};

export const userRegisterSuccess = (data) => {
  return {
    type: authActions.REGISTER_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const userRegisterFailed = (error) => {
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
  };
};

export const account = () => {
  return {
    type: authActions.ACCOUNT,
  };
};

export const accountSuccess = (data) => {
  return {
    type: authActions.ACCOUNT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const accountFailed = (error) => {
  return {
    type: authActions.ACCOUNT_FAILED,
    payload: {
      error,
    },
  };
};

export const accountInformation = (data) => {
  return {
    type: authActions.ACCOUNT_INFORMATION,
    payload: {
      data,
    },
  };
};

export const jsonToken = () => {
  return {
    type: authActions.LOGIN_JSON_TOKEN
  }
}

export const authorize = () => {
	return (dispatch) => {
		const token = Cookie.get("accessToken");
		if (token) {
			const id = parseJWT(token).sub;
			fetch(`http://localhost:3100/users/${id}`)
				.then((res) => res.json())
				.then((result) => {
					dispatch(userLoginSuccess(result));
				})
				.catch((error) => {
					console.log(error.toString());
				});
		}
	};
};

export const parseJWT = (token) => {
	const base64Url = token.split(".")[1];
	const base64 = decodeURIComponent(
		atob(base64Url)
			.split("")
			.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join("")
	);
	return JSON.parse(base64);
};
