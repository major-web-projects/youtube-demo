import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardListingContainer from "../../../components/dashboard/listings/DashboardListingContainer";
import UserLayout from "../../../components/layouts/users/UserLayout";
import listingAction from "../../../store/actions/listingAction";

const DashboardListingsIndexPage = () => {
  const dispatch = useDispatch();
  const { listingList } = useSelector((state) => state.listing);
  const { user = null } = useSelector((state) => state.auth);
  const loadListings = useCallback(() => {
    dispatch(listingAction.list({}));
  }, [user]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  return (
    <div className="dashboard-listing">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">My Listings</h1>
        <Link href="/dashboard/listings/create">
          <a className="fw-bold btn btn-primary" href="#">
            <i className="fi-plus me-2" />
            Add<span className="d-none d-sm-inline"> Listing</span>
          </a>
        </Link>
      </div>

      {/* Listings */}
      {listingList !== 0 && (
        <DashboardListingContainer listings={listingList} />
      )}
    </div>
  );
};

DashboardListingsIndexPage.PageLayout = UserLayout;
export default DashboardListingsIndexPage;
