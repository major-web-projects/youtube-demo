import axios from "axios";
import config from "../../config";

export const categoryTypes = {
  CATEGORY_REQUEST: "CATEGORY_REQUEST",
  CATEGORY_LIST: "CATEGORY_LIST",
  CATEGORY_READ: "CATEGORY_READ",
  CATEGORY_CREATE: "CATEGORY_CREATE",
  CATEGORY_FAIL: "CATEGORY_FAIL",
  CATEGORY_UPDATE: "CATEGORY_UPDATE",
  CATEGORY_REMOVE: "CATEGORY_REMOVE",
};

export const request = () => ({
  type: categoryTypes.CATEGORY_REQUEST,
  payload: null,
});

const list = () => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/categories`);
      dispatch({ type: categoryTypes.CATEGORY_LIST, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const read = (categoryId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/categories/${categoryId}`);
      dispatch({ type: categoryTypes.CATEGORY_READ, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const categoryBySlug = (slug) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/categories/by-slug/${slug}`);
      dispatch({ type: categoryTypes.CATEGORY_READ, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const create = (formData) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/api/categories`, formData);
      dispatch({ type: categoryTypes.CATEGORY_CREATE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      dispatch({ type: categoryTypes.CATEGORY_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

const update =
  ({ formData, categoryId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(
          `/api/categories/${categoryId}`,
          formData
        );
        dispatch({ type: categoryTypes.CATEGORY_UPDATE, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: categoryTypes.CATEGORY_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const remove = (categoryId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(`/api/categories/${categoryId}`);
      dispatch({ type: categoryTypes.CATEGORY_REMOVE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: categoryTypes.CATEGORY_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};
export default { list, read, create, update, remove, categoryBySlug };
