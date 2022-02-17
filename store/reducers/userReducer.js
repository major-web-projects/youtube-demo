import { userTypes } from "../actions/userAction";

const initialState = {
  userList: [],
  userRead: null,
  isUserLoading: true,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.USER_REQUEST:
      return {
        ...state,
        isUserLoading: true,
      };
    case userTypes.USER_LIST:
      return {
        ...state,
        userList: payload.users,
        isUserLoading: false,
      };
    case userTypes.USER_CREATE:
      return {
        ...state,
        userList: [payload.user, ...state.userList],
        isUserLoading: false,
      };
    case userTypes.USER_READ:
      return {
        ...state,
        userRead: payload.user,
        isUserLoading: false,
      };
    case userTypes.USER_UPDATE:
      return {
        ...state,
        userList: state.userList.map((cat) => {
          if (cat._id !== payload.user._id) {
            return cat;
          }
          return { ...cat, ...payload.user };
        }),
        isUserLoading: false,
      };
    case userTypes.USER_REMOVE:
      return {
        ...state,
        userList: state.userList.filter((cat) => cat._id !== payload.user._id),
        isUserLoading: false,
      };
    case userTypes.USER_FAIL:
      return {
        ...state,
        isUserLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
