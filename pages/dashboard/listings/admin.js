import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminListingContainer from "../../../components/dashboard/listings/admin/AdminListingContainer";
import DashboardListingContainer from "../../../components/dashboard/listings/DashboardListingContainer";
import UserLayout from "../../../components/layouts/users/UserLayout";
import listingAction from "../../../store/actions/listingAction";

const DashboardListingsAdminPage = () => {
  const dispatch = useDispatch();
  const { listingList, meta } = useSelector((state) => state.listing);
  const { user = null } = useSelector((state) => state.auth);

  const router = useRouter();
  const page = router.query.page;

  const loadListings = () => dispatch(listingAction.list({ page }));

  useEffect(() => {
    loadListings();
  }, [page]);

  return (
    <div className="dashboard-listing">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">Manage Listings</h1>
        <Link href="/dashboard/listings/create">
          <a className="fw-bold btn btn-primary" href="#">
            <i className="fi-plus me-2" />
            Add<span className="d-none d-sm-inline"> Listing</span>
          </a>
        </Link>
      </div>

      {/* Listings */}
      {listingList !== 0 && (
        <AdminListingContainer listings={listingList} meta={meta} />
      )}
    </div>
  );
};

DashboardListingsAdminPage.PageLayout = UserLayout;
export default DashboardListingsAdminPage;
