import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import moment from "moment";

const Listinglisting = ({ listing }) => {
  const dispatch = useDispatch();

  const imageUrl = listing?.thumbnails?.medium?.url
    ? `${listing?.thumbnails?.medium?.url}`
    : `/images/defaults/missing_listing.png`;

  return (
    <>
      <div className="col-12">
        <div className={`card flex-md-row mb-4 box-shadow h-md-250`}>
          <div className="card-body d-flex flex-column align-listings-start">
            <strong className="d-inline-block mb-2 text-success">Design</strong>
            <Link href={"/listings/[slug]"} as={`/listings/${listing?.slug}`}>
              <a className="text-decoration-none text-dark">
                <h3 className="mb-0">{listing?.name}</h3>
              </a>
            </Link>
            <p className="mb-1 text-muted">Published: {listing?.publishedAt}</p>
            <p className="card-text mb-2">{listing?.description}</p>

            <div className="row g-2  mb-2">
              <div className="col me-sm-1">
                <div className="bg-light rounded text-center w-100 h-100 p-2">
                  <span className="d-block h4  mb-0 mx-center">
                    {listing?.viewCount}
                  </span>

                  <span className="fs-xs">Views</span>
                </div>
              </div>
              <div className="col me-sm-1">
                <div className="bg-light rounded text-center w-100 h-100 p-2">
                  <span className="d-block h4 mb-0 mx-center">
                    {listing?.subscriberCount}
                  </span>
                  <span className="fs-xs">Subscriber</span>
                </div>
              </div>
              <div className="col">
                <div className="bg-light rounded text-center w-100 h-100 p-2">
                  <span className="d-block h4 mb-0 mx-center">
                    {listing?.videoCount}
                  </span>
                  <span className="fs-xs">Videos</span>
                </div>
              </div>
            </div>

            <div className="card-text mb-auto">
              <a
                href={`https://www.youtube.com/channel/${listing?.channelId}`}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-dark"
              >
                View Channel on youtube
              </a>
              {/* <Link href={"/listings/[slug]"} as={`/listings/${listing?.slug}`}>
                <a>View</a>
              </Link> */}
            </div>
          </div>
          <Image
            className="card-img-right flex-auto d-block"
            alt="image"
            width={250}
            height={250}
            src={imageUrl}
          />
        </div>
      </div>
    </>
  );
};

export default Listinglisting;
