import React from "react";
import Link from "next/link";
import ListingItem from "../listings/ListingItem";
import ListingNotFound from "../listings/ListingNotFound";

const SellerListingContainer = ({ listings, meta }) => {
  return (
    <div className="listing">
      {/* Sorting*/}
      <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
        <div className="d-flex align-items-center flex-shrink-0">
          <label className="fs-sm me-2 pe-1 text-nowrap" htmlFor="sortby">
            <i className="fas fa-arrows-sort text-muted mt-n1 me-2" />
            Sort by:
          </label>
          <select className="form-select form-select-sm" id="sortby">
            <option>Newest</option>
            <option>Popularity</option>
            <option>Low - High Price</option>
            <option>High - Low Price</option>
            <option>High rating</option>
            <option>Average Rating</option>
          </select>
        </div>
        <hr className="d-none d-sm-block w-100 mx-4" />
        <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
          <i className="fas fa-check-circle me-2" />
          <span className="fs-sm mt-n1">
            {meta?.totalListings || 0} results
          </span>
        </div>
      </div>

      {/* Catalog grid*/}
      <div className="row ">
        {/* Array.from(new Array(20).keys()).map((listing, i) => (
            <Skeleton count={10} key={i} />
          )) */}
        {listings.length == 0 ? (
          <ListingNotFound />
        ) : (
          listings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default SellerListingContainer;
