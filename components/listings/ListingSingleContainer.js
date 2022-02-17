import React from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../layouts/Breadcrumbs";
import SingleListingsContainer from "./single/SingleListingsContainer";
import ListingSingleSidebar from "./sidebar/ListingSingleSidebar";
import { Dropdown } from "react-bootstrap";

import Image from "next/image";

const ListingSingleContainer = ({ listing }) => {
  const { user } = useSelector((state) => state.auth);

  const imgUrl = listing?.thumbnails?.medium?.url
    ? `${listing?.thumbnails?.medium?.url}`
    : `/images/defaults/missing_listing.png`;

  return (
    <>
      <section className="container listing-single mt-5 mb-2 pt-5">
        <Breadcrumbs />
        <div className="row">
          <div className="col-12">
            <section className="listing-header border-bottom">
              <div className="d-sm-flex align-items-center justify-content-between mb-0 pb-sm-2">
                <h1 className="h2 me-3 mb-sm-0">{listing?.name}</h1>

                <div className="text-nowrap">
                  <button
                    className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle"
                    type="button"
                  >
                    <i className="fas fa-heart" />
                  </button>
                  <Dropdown className="d-inline-block ms-2">
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      className="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle"
                    >
                      <i className="fas fa-share" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <button className="dropdown-item" type="button">
                        <i className="fas fa-facebook fs-base opacity-75 me-2" />
                        Facebook
                      </button>
                      <button className="dropdown-item" type="button">
                        <i className="fas fa-twitter fs-base opacity-75 me-2" />
                        Twitter
                      </button>
                      <button className="dropdown-item" type="button">
                        <i className="fas fa-instagram fs-base opacity-75 me-2" />
                        Instagram
                      </button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </section>
            {/* Page content */}
            <section className="listing-info">
              <div className="row gy-4 gx-3 gx-xxl-3 py-4">
                {/* Left column*/}
                <div className="col-md-8 pb-2 order-lg-1">
                  <div className="mb-1">
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
                {/* Sidebar*/}
                <ListingSingleSidebar
                  user={listing?.user}
                  listingId={listing?._id}
                  isAuth={user ? true : false}
                  listing={listing}
                />
                <div className="mb-2 col-12 order-lg-3">
                  <h2 className="h4 mb-4">Description</h2>
                  <div>{listing.description}</div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-12">
            <h3>You Might Also Like</h3>
            {listing && <SingleListingsContainer listingId={listing?._id} />}
          </div>
        </div>
      </section>
      <style jsx>{`
        .entry-meta {
          margin-bottom: 0.75rem;
          padding-left: 0;
        }
        .entry-meta li {
          display: inline-block;
          color: #646464;
          font-size: 0.9375rem;
          margin-bottom: 0.125rem;
          margin-right: 0.9375rem;
        }
      `}</style>
    </>
  );
};

export default ListingSingleContainer;
