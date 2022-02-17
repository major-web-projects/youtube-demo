import React, { useEffect, useRef } from "react";
import ListingSlider from "../listings/slider/ListingSlider";
import Typed from "typed.js";

import dynamic from "next/dynamic";
import HomeSearch from "./HomeSearch";
const HomeSingleListingSlider = dynamic(() =>
  import("../listings/slider/HomeSingleListingSlider")
);

const HomeBanner = ({ listings = [] }) => {
  // Create Ref element.
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "near you",
        "in South Africa",
        "in Cape town",
        "in Johannesburg",
      ], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <section
        className="jarallax bg-dark zindex-1 py-xxl-5"
        data-jarallax
        data-speed="0.5"
      >
        <span
          className="img-overlay bg-transparent opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(31, 27, 45, .7), rgba(31, 27, 45, .7))",
          }}
        />
        <div
          className="jarallax-img"
          style={{
            backgroundImage: "url(/images/banner1.jpg)",
          }}
        />
        <div className="content-overlay container py-md-5">
          <div className="mt-5 mb-md-5 py-5">
            <div className="col-12 mx-auto mb-sm-5 mb-4 px-0 text-center">
              <h1 className="display-5 text-light mt-sm-5 my-4">
                Find nomayini
                <span className="dropdown d-inline-block ms-2" ref={el}></span>
              </h1>
              <p className="fs-lg text-white">
                Make some extra cash by selling things in your community. Go on,
                its quick and easy.
              </p>
            </div>
            <div className="col-12 mx-auto px-0">
              {/* Search form*/}
              <HomeSearch />
            </div>
          </div>
        </div>
        <div
          className="position-absolute d-none d-xxl-block bottom-0 start-0 w-100 bg-white zindex-1"
          style={{
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            height: "30px",
          }}
        />
      </section>
    </>
  );
};

export default HomeBanner;
