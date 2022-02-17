import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authReducer from "./authReducer";
import listingReducer from "./listingReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  listing: listingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.auth) nextState.auth = state.auth;
    if (state.love) nextState.love = state.love; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
