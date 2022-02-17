import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listingAction from "../store/actions/listingAction";
import Link from "next/link";
import HomeListingContainer from "../components/pages/HomeListingContainer";

const IndexPage = () => {
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listing);

  const loadListings = () => dispatch(listingAction.list({}));

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <div>
        <main className="page-wrapper">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">
                Buy and sell digital properties
              </h1>
              <p className="lead font-weight-normal">
                The safest digital property marketplace. If you want to buy or
                sell a website, blog or YouTube channel this is the best place
                to do it.
              </p>
            </div>
            <div className="listing-device box-shadow d-none d-md-block" />
            <div className="listing-device listing-device-2 box-shadow d-none d-md-block" />
          </div>

          {/* Recent listings grid*/}
          <section className="container pb-5 mb-lg-3">
            {/* Heading*/}
            <div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4">
              <h2 className="h3 mb-0 pt-3 me-2">Popular listings</h2>
              <div className="pt-3">
                <select className="form-select me-2">
                  <option>All categories</option>
                  <option>Photos</option>
                  <option>Graphics</option>
                  <option>UI Design</option>
                  <option>Web Themes</option>
                  <option>Fonts</option>
                  <option>Add-Ons</option>
                </select>
              </div>
            </div>
            {/* Grid*/}
            {/* Listing*/}
            <div className="row pt-3 pb-2 mx-2">
              <HomeListingContainer
                listings={listing.listingList}
                isListingLoading={listing.isListingLoading}
              />
            </div>
            {/* Listing*/}
            <div className="text-center">
              <Link href="/listings" passHref>
                <a className="btn btn-outline-primary">
                  View more listings
                  <i className="fas fa-arrow-right fs-ms ms-1" />
                </a>
              </Link>
            </div>
          </section>
        </main>
      </div>
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

        .bg-cover {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }

        .light-overlay,
        .dark-overlay,
        .gradient-overlay {
          position: relative;
          overflow: hidden;
        }
        .light-overlay .overlay-content,
        .dark-overlay .overlay-content,
        .gradient-overlay .overlay-content {
          position: relative;
          z-index: 20;
        }
        .light-overlay::after,
        .dark-overlay::after,
        .gradient-overlay::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: " ";
          opacity: 0.3;
          background: #000;
        }
        .light-overlay::after {
          opacity: 0.3;
          background: #fff;
        }
        .gradient-overlay::after {
          opacity: 1;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 78%,
            rgba(0, 0, 0, 0.65) 100%
          );
        }
      `}</style>
    </>
  );
};
export default IndexPage;
