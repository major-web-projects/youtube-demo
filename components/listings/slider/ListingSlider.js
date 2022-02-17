import React from "react";
import Slider from "react-slick";
import ListingCarouselItem from "./ListingCarouselItem";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListingSlider = ({ listings = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    // slidesToScroll: 2,
    centerMode: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    // rows: 2,
    // slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 924,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="pt-3 pb-3">
      {listings.length !== 0 && (
        <Slider {...settings}>
          {listings.map((listing, index) => {
            return (
              <ListingCarouselItem
                listing={listing}
                key={`${listing._id}-${index}`}
              />
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default ListingSlider;
