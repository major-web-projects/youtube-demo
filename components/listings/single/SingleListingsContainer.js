import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listingAction from "../../../store/actions/listingAction";
import ListingItem from "../ListingItem";

const SingleListingsContainer = ({ listingId }) => {
  const dispatch = useDispatch();
  const { isListingLoading, listingListRelated = [] } = useSelector(
    (state) => state.listing
  );

  const loadRelated = () => dispatch(listingAction.related(listingId));

  useEffect(() => {
    loadRelated();
  }, []);

  return (
    <div className="row">
      {listingListRelated.length !== 0 &&
        listingListRelated.map((item) => (
          <ListingItem listing={item} key={item._id} />
        ))}
    </div>
  );
};

export default SingleListingsContainer;
