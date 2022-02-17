import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleListingSlider = ({ listing }) => {
  const settings = {
    lazyLoad: true,
    fade: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
  };
  return (
    <div>
      <Slider {...settings} className="row">
        {listing.photos.length !== 0 ? (
          listing.photos.map((image, index) => {
            return (
              <div className="col w-100" key={`image-${index}`}>
                {JSON.stringify(image)}
                {/* <Image
                  src={`${image.url}?${new Date().getTime()}`}
                  alt="Picture of the author"
                  className="img-fluid"
                  style={{ width: "100%", height: "450px" }}
                /> */}
              </div>
            );
          })
        ) : (
          <div className="col w-100" key={`image-${index}`}>
            <Image
              src="/api/listings/defaultphoto"
              alt="default listings pictures"
              className="img-fluid"
              height="450px"
              width="450px"
            />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default SingleListingSlider;
