import React from "react";
import Link from "next/link";

const ListingCoverCarouselItem = ({ listing }) => {
  const imgUrl =
    listing?.images.length !== 0
      ? `${listing?.images[0].url}`
      : `/images/defaults/missing_listing.png`;

  return (
    <div className="jarallax bg-dark z-index-1 py-xxl-5">
      <div
        className="jarallax-img"
        style={{
          backgroundImage: "url(/images/banner/banner1.jpg)",
        }}
      />
      <div className="content-overlay container py-md-5">
        <div className="mt-5 mb-md-5 py-5">
          <div className="col-12 mx-auto mb-sm-5 mb-4 px-0 text-center">
            <h1 className="display-5 text-light mt-sm-5 my-4">
              Find nomayini
              <span className="dropdown d-inline-block ms-2"></span>
            </h1>
            <p className="fs-lg text-white">
              Make some extra cash by selling things in your community. Go on,
              its quick and easy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCoverCarouselItem;
