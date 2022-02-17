import axios from "axios";
import config from "../../config";

export const userTypes = {
  USER_REQUEST: "USER_REQUEST",
  USER_LIST: "USER_LIST",
  USER_READ: "USER_READ",
  USER_CREATE: "USER_CREATE",
  USER_FAIL: "USER_FAIL",
  USER_UPDATE: "USER_UPDATE",
  USER_REMOVE: "USER_REMOVE",
};

export const request = () => ({
  type: userTypes.USER_REQUEST,
  payload: null,
});

const list = () => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/users`);
      dispatch({ type: userTypes.USER_LIST, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;

      return reject(errorMsg);
    }
  });
};

const read = (userId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch({ type: userTypes.USER_READ, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;

      return reject(errorMsg);
    }
  });
};

const create = (formData) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/api/users`, formData);
      dispatch({ type: userTypes.USER_CREATE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      dispatch({ type: userTypes.USER_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

const update =
  ({ formData, userId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(`/api/users/${userId}`, formData);
        dispatch({ type: userTypes.USER_UPDATE, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: userTypes.USER_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const remove = (userId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}`);
      dispatch({ type: userTypes.USER_REMOVE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: userTypes.USER_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

const userBySlug = (slug) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/users/by-slug/${slug}`);
      dispatch({ type: userTypes.USER_READ, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;

      return reject(errorMsg);
    }
  });
};

export default { list, read, create, update, remove, userBySlug };
