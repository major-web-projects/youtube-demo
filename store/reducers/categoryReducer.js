import { categoryTypes } from "../actions/categoryAction";

const initialState = {
  categoryList: [],
  categoryRead: null,
  isCategoryLoading: true,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case categoryTypes.CATEGORY_REQUEST:
      return {
        ...state,
        isCategoryLoading: true,
      };
    case categoryTypes.CATEGORY_LIST:
      return {
        ...state,
        categoryList: payload.categories,
        isCategoryLoading: false,
      };
    case categoryTypes.CATEGORY_CREATE:
      return {
        ...state,
        categoryList: [payload.category, ...state.categoryList],
        isCategoryLoading: false,
      };
    case categoryTypes.CATEGORY_READ:
      return {
        ...state,
        categoryRead: payload.category,
        isCategoryLoading: false,
      };
    case categoryTypes.CATEGORY_UPDATE:
      return {
        ...state,
        categoryList: state.categoryList.map((cat) => {
          if (cat._id !== payload.category._id) {
            return cat;
          }
          return { ...cat, ...payload.category };
        }),
        isCategoryLoading: false,
      };
    case categoryTypes.CATEGORY_REMOVE:
      return {
        ...state,
        categoryList: state.categoryList.filter(
          (cat) => cat._id !== payload.category._id
        ),
        isCategoryLoading: false,
      };
    case categoryTypes.CATEGORY_FAIL:
      return {
        ...state,
        isCategoryLoading: false,
      };

    default:
      return state;
  }
};

export default categoryReducer;
