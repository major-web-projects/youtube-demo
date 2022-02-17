import React, { Component } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListingCoverCarouselItem from "./ListingCoverCarouselItem";

import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"));
const HomeSingleListingSlider = ({ listings = [] }) => {
  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    arrows: false,
  };
  const lists = [listings[0]];
  return (
    <div className="home-slide">
      <Slider {...settings}>
        <div className="jarallax bg-dark zindex-1 py-xxl-5">
          <div
            className="jarallax-img"
            style={{
              backgroundImage: "url(/images/banner/banner3.jpg)",
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
                  Make some extra cash by selling things in your community. Go
                  on, its quick and easy.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="jarallax bg-dark zindex-1 py-xxl-5">
          <div
            className="jarallax-img"
            style={{
              backgroundImage: "url(/images/banner/banner1.jpg)",
            }}
          />
          <div className="content-overlay container py-md-5">
            <div className="mt-5 mb-md-5 py-5">
              <div className="col-12 mx-auto mb-sm-5 mb-4 px-0 text-center">
                <h1 className="display-5  mt-sm-5 my-4">
                  Find nomayini
                  <span className="dropdown d-inline-block ms-2"></span>
                </h1>
                <p className="fs-lg text-white">
                  Make some extra cash by selling things in your community. Go
                  on, its quick and easy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
      <style jsx>{`
        .content-overlay {
          text-shadow: 2px 2px 2px black;
        }
      `}</style>
    </div>
  );
};

export default HomeSingleListingSlider;
