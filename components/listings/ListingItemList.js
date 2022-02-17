import Link from "next/link";
import React from "react";
import Image from "next/image";
import moment from "moment";

const ListingItemList = ({ listing }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const imgUrl = listing?.coverimage
    ? `${listing.coverimage.url}`
    : `/images/defaults/missing_listing.png`;
  return (
    <>
      <div className="d-flex align-items-center  py-2 border-bottom">
        <Link href={`/dashboard/listings/${listing.slug}`}>
          <a
            className="d-block mb-0 me-4 ms-0 mx-auto"
            style={{ width: "12.5rem" }}
          >
            <Image
              height="180px"
              width="180px"
              src={imgUrl}
              alt="Listing"
              className="rounded-3"
            />
          </a>
        </Link>
        <div className="text-start">
          <h3 className="h6 listing-name mb-2">
            <Link href={`/dashboard/listings/${listing.slug}`}>
              <a>{listing.name}</a>
            </Link>
          </h3>
          <div className="text-accent">R{listing.price}</div>

          <div className="d-none d-md-block">
            {listing.description.substring(0, 64).replace(/(<([^>]+)>)/gi, "")}
          </div>
          {/* <p className="mb-1 fs-xs fw-normal text-uppercase text-primary">
            {listing?.category?.name}
          </p> */}
          <div className="d-flex justify-content-start pt-2">
            <p className="text-muted  mb-1  me-2">
              <span className="text-muted  me-2">by</span>
              <Link
                href={`/sellers/[sellerId]`}
                as={`/sellers/${listing?.user._id}`}
              >
                <a className="listing-meta fw-medium  me-2">
                  {listing?.user.name || "user"}{" "}
                </a>
              </Link>
              <span className="text-muted  me-2"> in </span>
              <Link
                href={`/categories/[categoryId]`}
                as={`/categories/${listing.category._id}`}
              >
                <a className="listing-meta fw-medium  me-2">
                  {listing.category.name}
                </a>
              </Link>
              <span className="text-muted  me-2">
                {moment(listing.createdAt).fromNow()}
              </span>
              <span className="text-muted  me-2">
                {listing.city && listing.city.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItemList;
