import Link from "next/link";
import moment from "moment";
import React from "react";
import Image from "next/image";

const DashboardListingSingleContainer = ({ listing }) => {
  const imgUrl = listing?.image?.full_url
    ? `${listing?.image?.full_url}`
    : `/images/defaults/missing_listing.png`;
  return (
    <section className="single-listing">
      <div className="d-sm-flex align-items-center justify-content-between mb-3 pb-sm-2">
        <h1 className="h2 me-3 mb-sm-0">{listing?.name}</h1>
        <Link href={`/dashboard/listings/edit?listingId=${listing?._id}`}>
          <a className="btn bg-faded-info  " name="Edit">
            <i className="fas fa-edit text-info" /> Edit
          </a>
        </Link>
      </div>
      {/* <div className="row g-2">
        <div className="col me-sm-1">
          <div className="bg-secondary rounded text-center w-100 h-100 p-2">
            <i className="fi-dashboard d-block h4  mb-0 mx-center" />
            <span className="fs-xs">10K mi</span>
          </div>
        </div>
        <div className="col me-sm-1">
          <div className="bg-secondary rounded text-center w-100 h-100 p-2">
            <i className="fi-gearbox d-block h4 mb-0 mx-center" />
            <span className="fs-xs">Automatic</span>
          </div>
        </div>
        <div className="col">
          <div className="bg-secondary rounded text-center w-100 h-100 p-2">
            <i className="fi-petrol d-block h4 mb-0 mx-center" />
            <span className="fs-xs">Gasoline</span>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-12">
          <div className="py-3">
            <h2 className="h4 mb-4">Details</h2>
            <div className="row">
              <div className="col-sm-6 col-md-12 col-lg-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-user me-1" />{" "}
                    <strong className="me-2">Listed By:</strong>
                    <Link
                      href={{
                        pathname: `/sellers/[slug]`,
                        query: {
                          redirect: `/sellers/${listing?.user?.slug}`,
                        },
                      }}
                      as={`/sellers/${listing?.user?.slug}`}
                    >
                      <a className="listing-meta fw-medium">
                        {listing?.user?.name || "user"}
                      </a>
                    </Link>
                  </li>

                  <li className="mb-2">
                    <i className="fas fa-tags me-1" />
                    <strong className="me-2">Views:</strong>

                    <span className="listing-meta fw-medium">
                      {listing?.viewCount}
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-tags me-1" />
                    <strong className="me-2">Subscribers:</strong>

                    <span className="listing-meta fw-medium">
                      {listing?.subscriberCount}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-12 col-lg-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="far fa-clock me-1" />
                    <strong className="me-2">Published: </strong>

                    {moment(listing?.publishedAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-tags me-1" />
                    <strong className="me-2">Category:</strong>
                    <Link
                      href={`/categories/[slug]`}
                      as={`/categories/${listing?.category?.slug}`}
                    >
                      <a className="listing-meta fw-medium">
                        {listing?.category?.name}
                      </a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-tags me-1" />
                    <strong className="me-2">Videos:</strong>

                    <span className="listing-meta fw-medium">
                      {listing?.videoCount}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-4 pb-md-3">
            <h2 className="h4 mb-4">Description</h2>
            <div>{listing.description}</div>
          </div>
          <div className="mb-4 pb-md-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4">Gallery</h2>
            </div>
            <div className="w-100 card">
              <Image
                src={imgUrl}
                alt="default listings pictures"
                className="img-fluid card-img-top"
                width="650px"
                height="400px"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardListingSingleContainer;
