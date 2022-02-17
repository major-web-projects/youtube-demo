import axios from "axios";
import qs from "qs"; //query-string
import config from "../../config";

function cleanObj(object) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") {
      cleanObj(v);
    }
    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined
    ) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}

export const listingTypes = {
  LISTING_REQUEST: "LISTING_REQUEST",
  LISTING_LIST: "LISTING_LIST",
  LISTING_SEARCH_LIST: "LISTING_SEARCH_LIST",
  LISTING_LIST_RELATED: "LISTING_LIST_RELATED",
  LISTING_READ: "LISTING_READ",
  LISTING_CREATE: "LISTING_CREATE",
  LISTING_FAIL: "LISTING_FAIL",
  LISTING_UPDATE: "LISTING_UPDATE",
  LISTING_UPLOAD: "LISTING_UPLOAD",
  LISTING_REMOVE: "LISTING_REMOVE",
  LISTING_CLEAR: "LISTING_CLEAR",
  LISTING_REMOVE_IMAGE: "LISTING_REMOVE_IMAGE",
  LISTING_SEARCH_CHANNEL: "LISTING_SEARCH_CHANNEL",
};

export const request = () => ({
  type: listingTypes.LISTING_REQUEST,
  payload: null,
});

const search = () => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/listings`);
      dispatch({ type: listingTypes.LISTING_LIST, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const searchChannel = (formData) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `/api/listings/search-youtube-channel`,
        formData
      );
      dispatch({ type: listingTypes.LISTING_SEARCH_CHANNEL, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const list = (query) => (dispatch) => {
  dispatch(request());

  const stringified = qs.stringify(cleanObj(query), { skipNulls: true });
  console.log(stringified);
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/listings?${stringified}`);
      dispatch({ type: listingTypes.LISTING_SEARCH_LIST, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const related = (listingId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/listings/related/${listingId}`);
      dispatch({ type: listingTypes.LISTING_LIST_RELATED, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const read = (listingId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/listings/${listingId}`);
      dispatch({ type: listingTypes.LISTING_READ, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const listingBySlug = (slug) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/listings/by-slug/${slug}`);
      dispatch({ type: listingTypes.LISTING_READ, payload: data });
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
      const { data } = await axios.post(`/api/listings`, formData);
      dispatch({ type: listingTypes.LISTING_CREATE, payload: data });
      return resolve(data.listing);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

const update =
  ({ formData, listingId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(
          `/api/listings/${listingId}`,
          formData
        );
        dispatch({ type: listingTypes.LISTING_UPDATE, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const remove = (listingId) => (dispatch) => {
  dispatch(request());
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(`/api/listings/${listingId}`);
      dispatch({ type: listingTypes.LISTING_REMOVE, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
      return reject(errorMsg);
    }
  });
};

const upload =
  ({ formData, listingId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(
          `/api/listings/upload/${listingId}`,
          formData
        );
        dispatch({ type: listingTypes.LISTING_UPLOAD, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const removeImage =
  ({ formData, listingId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(
          `/api/listings/remove-image/${listingId}`,
          formData
        );
        dispatch({ type: listingTypes.LISTING_REMOVE_IMAGE, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const uploadCoverImage =
  ({ formData, listingId }) =>
  (dispatch) => {
    dispatch(request());
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(
          `/api/listings/upload-cover-image/${listingId}`,
          formData
        );
        dispatch({ type: listingTypes.LISTING_UPLOAD, payload: data });
        return resolve();
      } catch (error) {
        const errorMsg = error.response.data.message || error.message;
        dispatch({ type: listingTypes.LISTING_FAIL, payload: null });
        return reject(errorMsg);
      }
    });
  };

const currentUser = (query) => (dispatch) => {
  dispatch(request());

  const stringified = qs.stringify(cleanObj(query), { skipNulls: true });
  console.log(stringified);
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `/api/listings/current-user?${stringified}`
      );
      dispatch({ type: listingTypes.LISTING_SEARCH_LIST, payload: data });
      return resolve();
    } catch (error) {
      const errorMsg = error.response.data.message || error.message;
      console.log(errorMsg);
      return reject(errorMsg);
    }
  });
};

const clear = () => ({
  type: listingTypes.LISTING_CLEAR,
  payload: null,
});

export default {
  list,
  read,
  create,
  update,
  remove,
  upload,
  removeImage,
  uploadCoverImage,
  search,
  related,
  clear,
  listingBySlug,
  currentUser,
  searchChannel,
};
