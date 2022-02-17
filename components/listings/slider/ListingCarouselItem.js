import Link from "next/link";
import React from "react";
import Image from "next/image";

const ListingCarouselItem = ({ listing }) => {
  const imgUrl = listing?.image?.full_url
    ? `${listing?.image?.full_url}`
    : `/images/defaults/missing_listing.png`;

  return (
    <div className="col mb-grid-gutter pb-2">
      <Link href={`/listings/[slug]`} as={`/listings/${listing.slug}`}>
        <a className="card listing-card h-100 border-1">
          {/* <span className="badge  badge-top  badge-end badge-shadow bg-success fs-md fw-medium">
              AMC: $17.<small>00</small>
            </span> */}
          <Image
            height="250px"
            width="250px"
            className="card-img-to"
            src={imgUrl}
            alt={`Carourel image ${listing.name}}`}
          />
          <div
            className="pt-1 px-2 mx-auto mt-n5"
            // style={{ width: "175px" }}
            style={{ zIndex: 9 }}
          >
            <div className="badge badge-shadow bg-warning text-dark text-shadow fs-md fw-medium">
              <strong>R{listing.price}</strong>
            </div>
          </div>
          <div className="card-body text-center p-2">
            <h2 className="h6 mb-0 text-truncate">{listing.name}</h2>
            {/* <div className="d-flex flex-wrap justify-content-between align-items-start pb-2">
              <div className="text-muted fs-xs me-1">
                {moment(listing.createdAt).fromNow()}
              </div>
              <div className="text-muted fs-xs me-1">{listing?.city?.name}</div>
            </div> */}
          </div>
        </a>
      </Link>
      <style jsx>{`
        .listing-card {
          padding-bottom: 1.25rem;
          // border: 0;
          border-radius: 0;
          margin: 2px;
          transition: all 0.15s ease-in-out;
        }
        .listing-card a {
          text-decoration: none;
        }
        .listing-card .mt-n5 {
          margin-top: -3rem !important;
        }
        .listing-card .listing-card-actions,
        .listing-card > .btn-wishlist,
        .listing-card .badge-top {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 5;
        }
        .listing-card .listing-card-actions .btn-action {
          padding: 0.5rem;
          transition: all 0.15s ease-in-out;
          border-radius: 0.25rem;
          background-color: #fff;
          font-size: 0.8125rem;
          visibility: hidden;
          opacity: 0;
        }
        .listing-card .badge-top {
          right: auto;
          left: 0.75rem;
        }
        .listing-card .badge-top.badge-end {
          right: 0.75rem;
          left: auto;
        }
        .listing-card .card-body {
          position: relative;
          background-color: #fff;
          z-index: 2;
        }
        .listing-card .card-body-hidden {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          margin-top: -1.25rem;
          transition: all 0.15s ease-in-out;
          border-radius: 0.4375rem;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          z-index: 1;
        }
        @media (min-width: 500px) {
          .listing-card {
            padding-bottom: 0;
          }
        }
        @media (min-width: 992px) {
          .listing-card:hover:not(.card-static) {
            border-color: #fff !important;
            box-shadow: 0 0.3rem 1.525rem -0.375rem rgba(0, 0, 0, 0.1);
            z-index: 10;
          }
          .listing-card:hover:not(.card-static)
            .listing-card-actions
            .btn-action {
            opacity: 1;
            visibility: visible;
          }
          .listing-card:hover:not(.card-static) .card-body-hidden {
            opacity: 1;
            visibility: visible;
            box-shadow: 0 0.3rem 1.525rem -0.375rem rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ListingCarouselItem;
