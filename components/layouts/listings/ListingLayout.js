import React, { useState } from "react";
import ListingSidebar from "./ListingSidebar";
import { useSelector } from "react-redux";
import PageLayout from "../PageLayout";
import Breadcrumbs from "../Breadcrumbs";

const ListingLayout = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);
  const category = useSelector((state) => state.category);

  return (
    <PageLayout>
      <div className="container mt-5 mb-2 pt-5">
        <div className="row g-0 mt-n3">
          {/* Page content*/}
          <div className="col-lg-8 col-xl-9 position-relative overflow-hidden border-end-lg  pb-5 pt-4 px-3">
            {/* Breadcrumb*/}
            <Breadcrumbs />
            {/* Name*/}
            <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
              <h1 className="h2 mb-sm-0">Listings</h1>
            </div>
            {children}
          </div>
          <ListingSidebar
            categories={category.categoryList}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm w-100 rounded-0 fixed-bottom d-lg-none"
        type="button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <i className="fi-filter me-2" />
        Filters
      </button>
    </PageLayout>
  );
};

export default ListingLayout;
