import React, { useEffect } from "react";
import ListingItem from "../listings/ListingItem";
import Skeleton from "react-loading-skeleton";
import ListingNotFound from "../listings/ListingNotFound";

const HomeListingContainer = ({
  listings,
  meta,
  onPageChanged,
  isLoadingListing = false,
}) => {
  if (isLoadingListing) {
    return Array.from(new Array(20).keys()).map((listing, i) => (
      <Skeleton count={10} key={i} />
    ));
  }
  return (
    <div className="listing">
      {/* Catalog grid*/}
      <div className="row py-4">
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

export default HomeListingContainer;
