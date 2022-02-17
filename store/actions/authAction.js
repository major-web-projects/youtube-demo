import axios from "axios";
import config from "../../config";
const apiUrl = config.apiUrl;

export const authTypes = {
  AUTH_REQUEST: "AUTH_REQUEST",
  AUTH_SIGNUP: "AUTH_SIGNUP",
  AUTH_SIGNIN: "AUTH_SIGNIN",
  AUTH_LOAD_USER: "AUTH_LOAD_USER",
  AUTH_SIGNOUT: "AUTH_SIGNOUT",
  AUTH_UPLOAD_AVATAR: "AUTH_UPLOAD_AVATAR",
  AUTH_UPLOAD_AVATAR_FAIL: "AUTH_UPLOAD_AVATAR_FAIL",
  AUTH_ERROR: "AUTH_ERROR",
  AUTH_FAIL: "AUTH_FAIL",
  AUTH_SIGNOUT_FAIL: "AUTH_SIGNOUT_FAIL",
  AUTH_PASSWORD_FORGOT: "AUTH_PASSWORD_FORGOT",
  AUTH_PASSWORD_RESET: "AUTH_PASSWORD_RESET",
  AUTH_PASSWORD_UPDATE: "AUTH_PASSWORD_UPDATE",
  AUTH_UPDATE_PROFILE: "AUTH_UPDATE_PROFILE",
  AUTH_SIGNIN_LIST: "AUTH_SIGNIN_LIST",
};

export const signupAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/api/auth/signup`, formData);
      dispatch({ type: authTypes.AUTH_SIGNUP, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_ERROR, payload: null });
      return reject(errorMsg);
    }
  });
};

export const signinAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/api/auth/signin`, formData);
      dispatch({ type: authTypes.AUTH_SIGNIN, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_ERROR, payload: null });
      return reject(errorMsg);
    }
  });
};

export const signoutAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/auth/signout`);
      dispatch({ type: authTypes.AUTH_SIGNOUT, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_SIGNOUT_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

export const currentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/auth`);
    dispatch({ type: authTypes.AUTH_LOAD_USER, payload: data });
  } catch (error) {
    dispatch({ type: authTypes.AUTH_ERROR, payload: null });
  }
};

export const uploadProfilePicAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/api/auth/upload-avatar`, formData);
      dispatch({ type: authTypes.AUTH_UPLOAD_AVATAR, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_UPLOAD_AVATAR_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

export const passwordForgotAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/api/auth/password/forgot`, formData);
      dispatch({ type: authTypes.AUTH_PASSWORD_FORGOT, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

export const passwordResetAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/api/auth/password/reset`, formData);
      dispatch({ type: authTypes.AUTH_PASSWORD_RESET, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

export const updatePasswordAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/api/auth/password/update`, formData);
      dispatch({ type: authTypes.AUTH_PASSWORD_UPDATE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

export const updateProfileAction = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/api/auth/update-profile`, formData);
      dispatch({ type: authTypes.AUTH_UPDATE_PROFILE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: authTypes.AUTH_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

///
export const currentUserSigninsList = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/signins/current-user`);
    dispatch({ type: authTypes.AUTH_SIGNIN_LIST, payload: data });
  } catch (error) {
    dispatch({ type: authTypes.AUTH_ERROR, payload: null });
  }
};
