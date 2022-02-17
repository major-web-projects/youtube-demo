import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const CategoryCard = () => {
  return (
    <section className="container d-flex flex-wrap flex-column flex-sm-row justify-content-between pt-5 mt-md-5">
      <a
        className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4"
        href="city-guide-catalog.html"
      >
        <div className="icon-box-media bg-faded-accent text-accent rounded-circle me-2">
          <i className="fas fa-bed" />
        </div>
        <h3 className="icon-box-name fs-sm ps-1 pe-2 mb-0">Accommodation</h3>
      </a>
      <a
        className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4"
        href="city-guide-catalog.html"
      >
        <div className="icon-box-media bg-faded-warning text-warning rounded-circle me-2">
          <i className="fas fa-cafe" />
        </div>
        <h3 className="icon-box-name fs-sm ps-1 pe-2 mb-0">Food &amp; Drink</h3>
      </a>
      <a
        className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4"
        href="city-guide-catalog.html"
      >
        <div className="icon-box-media bg-faded-primary text-primary rounded-circle me-0">
          <i className="fas fa-shopping-bag" />
        </div>
        <h3 className="icon-box-name fs-sm ps-0 pe-0 mb-0">Shopping</h3>
      </a>
      <a
        className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4"
        href="city-guide-catalog.html"
      >
        <div className="icon-box-media bg-faded-success text-success rounded-circle me-2">
          <i className="fas fa-museum" />
        </div>
        <h3 className="icon-box-name fs-sm ps-1 pe-2 mb-0">
          Art &amp; History
        </h3>
      </a>
      <a
        className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4"
        href="city-guide-catalog.html"
      >
        <div className="icon-box-media bg-faded-primary text-primary rounded-circle me-2">
          <i className="fas fa-entertainment" />
        </div>
        <h3 className="icon-box-name fs-sm ps-1 pe-2 mb-0">Entertainment</h3>
      </a>

      <Dropdown className="mb-2 mb-sm-3" align="end">
        <Dropdown.Toggle
          as="a"
          className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 shadow-sm rounded-pill py-2 ps-2 pe-4"
        >
          <div className="icon-box-media bg-faded-info text-info rounded-circle me-2">
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <h3 className="icon-box-name fs-sm ps-1 pe-2 mb-0">More</h3>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <a className="dropdown-item fw-bold" href="city-guide-catalog.html">
            <i className="fas fa-meds fs-base opacity-60 me-2" />
            Medicine
          </a>
          <a className="dropdown-item fw-bold" href="city-guide-catalog.html">
            <i className="fas fa-makeup fs-base opacity-60 me-2" />
            Beauty
          </a>
          <a className="dropdown-item fw-bold" href="city-guide-catalog.html">
            <i className="fas fa-car fs-base opacity-60 me-2" />
            Car Rental
          </a>
          <a className="dropdown-item fw-bold" href="city-guide-catalog.html">
            <i className="fas fa-dumbell fs-base opacity-60 me-2" />
            Fitness &amp; Sport
          </a>
          <a className="dropdown-item fw-bold" href="city-guide-catalog.html">
            <i className="fas fa-disco-ball fs-base opacity-60 me-2" />
            Night Club
          </a>{" "}
        </Dropdown.Menu>
      </Dropdown>
      {/* <DropdownButton
          align="end"
          name="Dropdown end"
          id="dropdown-menu-align-end"
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </DropdownButton> */}
    </section>
  );
};

export default CategoryCard;
