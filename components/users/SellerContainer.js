import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listingAction from "../../store/actions/listingAction";
import SellerListingContainer from "./SellerListingContainer";
import UserHeader from "./UserHeader";

const SellerContainer = ({ user }) => {
  const dispatch = useDispatch();
  const { listingList, meta } = useSelector((state) => state.listing);
  const loadListings = useCallback(() => {
    dispatch(listingAction.list({ user: user._id }));
  }, [user]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);
  return (
    <div className="user">
      <UserHeader user={user} />
      {/* Page content*/}
      <div className="card card-body p-4 p-md-5 shadow-sm">
        {/* Account nav*/}
        <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
          <h1 className="h2 mb-sm-0">Listings</h1>
        </div>
        {listingList !== 0 && (
          <SellerListingContainer listings={listingList} meta={meta} />
        )}
      </div>
    </div>
  );
};

export default SellerContainer;
