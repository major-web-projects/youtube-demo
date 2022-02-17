import Link from "next/link";
import React from "react";
import PageLink from "../PageLink";
import UserLayout from "../users/UserLayout";

const DashboardListingLayout = ({ children, title }) => {
  return (
    <div className="listing-layout">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">{title}</h1>
        <Link href="/dashboard/listings/create">
          <a className="fw-bold btn btn-primary" href="#">
            <i className="fi-plus me-2" />
            Add<span className="d-none d-sm-inline"> Listing</span>
          </a>
        </Link>
      </div>

      {/* Listings */}
      {children}
    </div>
  );
};

export default DashboardListingLayout;
