import * as authActions from '../constants/auth';

const initialState = {
  currentUser: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case authActions.LOGIN_USER:
        return {...state, currentUser: action.payload.userObj}
      case authActions.REGISTER_USER:
        return { ...state, currentUser: action.payload.userObj}
      case authActions.LOGOUT_USER_SUCCESS:
        return {...state, currentUser: {}}
      default:
        return state;
    }
  }