import { authTypes } from "../actions/authAction";

const initialState = {
  user: null,
  userSigninsList: [],
  isAuth: false,
  isAuthLoading: true,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.AUTH_REQUEST:
      return { ...state, isAuthLoading: true };
    case authTypes.AUTH_SIGNIN_LIST:
      return {
        ...state,
        userSigninsList: payload.userSignins,
        isAuthLoading: false,
      };
    case authTypes.AUTH_SIGNUP:
      return { ...state, ...payload, isAuthLoading: false };
    case authTypes.AUTH_LOAD_USER:
    case authTypes.AUTH_SIGNIN:
      return { ...state, ...payload, isAuth: true, isAuthLoading: false };
    case authTypes.AUTH_PASSWORD_UPDATE:
    case authTypes.AUTH_PASSWORD_RESET:
    case authTypes.AUTH_PASSWORD_FORGOT:
      return { ...state, success: true, isAuthLoading: false };
    case authTypes.AUTH_UPLOAD_AVATAR:
    case authTypes.AUTH_UPDATE_PROFILE:
      return { ...state, user: payload.user, isAuthLoading: false };
    case authTypes.AUTH_SIGNOUT:
    case authTypes.AUTH_ERROR:
      return {
        ...state,
        user: null,
        isAuth: false,
        success: false,
        isAuthLoading: false,
      };
    case authTypes.AUTH_FAIL:
      return {
        ...state,
        success: false,
        isAuthLoading: false,
      };
    case authTypes.AUTH_SIGNOUT_FAIL:
    case authTypes.AUTH_UPLOAD_AVATAR_FAIL:
      return { ...state, isAuthLoading: false };
    default:
      return state;
  }
};

export default authReducer;
