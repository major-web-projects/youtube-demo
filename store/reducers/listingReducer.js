import { listingTypes } from "../actions/listingAction";

const initialState = {
  listingList: [],
  listingRead: null,
  listingListRelated: [],
  youtubeChannelList: [],
  meta: null,
  isListingLoading: true,
  success: false,
};

const listingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case listingTypes.LISTING_REQUEST:
      return {
        ...state,
        isListingLoading: true,
        success: false,
      };
    case listingTypes.LISTING_SEARCH_LIST:
    case listingTypes.LISTING_LIST:
      return {
        ...state,
        listingList: payload.listings,
        meta: payload.meta,
        isListingLoading: false,
      };
    case listingTypes.LISTING_LIST_RELATED:
      return {
        ...state,
        listingListRelated: payload.listings,
        isListingLoading: false,
      };
    case listingTypes.LISTING_SEARCH_CHANNEL:
      return {
        ...state,
        youtubeChannelList: payload.channels,
        success: true,
        isListingLoading: false,
      };
    case listingTypes.LISTING_CREATE:
      return {
        ...state,
        listingRead: payload.listing,
        success: true,
        isListingLoading: false,
      };
    case listingTypes.LISTING_READ:
      return {
        ...state,
        listingRead: payload.listing,
        isListingLoading: false,
      };
    case listingTypes.LISTING_UPDATE:
    case listingTypes.LISTING_UPLOAD:
    case listingTypes.LISTING_REMOVE_IMAGE:
      return {
        ...state,
        listingRead: payload.listing,
        success: true,
        isListingLoading: false,
      };
    case listingTypes.LISTING_REMOVE:
      return {
        ...state,
        listingList: state.listingList.filter(
          (cat) => cat._id !== payload.listing._id
        ),
        isListingLoading: false,
      };
    case listingTypes.LISTING_CLEAR:
      return {
        ...state,
        listingRead: null,
        isListingLoading: false,
      };
    case listingTypes.LISTING_FAIL:
      return {
        ...state,
        isListingLoading: false,
      };

    default:
      return state;
  }
};

export default listingReducer;
