import React from "react";
import Breadcrumbs from "../components/layouts/Breadcrumbs";

const ContactPage = () => {
  return (
    <div>
      <Breadcrumbs />
      {/* Page content*/}
      <section className="container my-5 pt-lg-5 pt-4 pb-lg-5">
        {/* Breadcrumbs*/}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pt-3 mb-4">
            <li className="breadcrumb-item">
              <a href="city-guide-home-v1.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </nav>
        <div className="row gy-4">
          <div className="col-12">
            <h1 className="mb-md-4 mb-3">Contact us</h1>
            <p className="mb-4 pb-md-2 fs-lg">
              Fill out the form and out team will try to get back to you within
              24 hours.
            </p>
            {/* Contact form*/}
            <form
              className="needs-validation row row-cols-sm-2 row-cols-1 gy-sm-4 gy-3"
              noValidate
            >
              <div className="col">
                <label className="form-label" htmlFor="c-name">
                  Full Name
                </label>
                <input
                  className="form-control form-control-lg"
                  id="c-name"
                  type="text"
                  required
                />
                <div className="invalid-tooltip mt-1">
                  Please, enter your name
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="c-email">
                  Email
                </label>
                <input
                  className="form-control form-control-lg"
                  id="c-email"
                  type="email"
                  required
                />
                <div className="invalid-tooltip mt-1">
                  Please, enter your email
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="c-phone">
                  Phone
                </label>
                <input
                  className="form-control form-control-lg"
                  id="c-phone"
                  type="tel"
                  required
                />
                <div className="invalid-tooltip mt-1">
                  Please, enter your phone
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="c-subject">
                  Subject
                </label>
                <select
                  className="form-select form-select-lg"
                  id="c-subject"
                  required
                >
                  <option value selected disabled>
                    Chose subject
                  </option>
                  <option value="Subject 1">Subject 1</option>
                  <option value="Subject 2">Subject 2</option>
                  <option value="Subject 3">Subject 3</option>
                </select>
                <div className="invalid-tooltip mt-1">
                  Please, choose your subject
                </div>
              </div>
              <div className="col-12 w-100">
                <label className="form-label" htmlFor="c-message">
                  Message
                </label>
                <textarea
                  className="form-control form-control-lg"
                  id="c-message"
                  rows={4}
                  placeholder="Leave your message"
                  required
                  defaultValue={""}
                />
                <div className="invalid-tooltip mt-1">
                  Please, leave your message
                </div>
              </div>
              <div className="col-12 w-100">
                <button
                  className="btn btn-lg btn-primary w-sm-auto w-100 mt-2"
                  type="submit"
                >
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Contact cards*/}
      <section className="container pb-5 mb-lg-5">
        <div className="row g-4">
          <div className="col-md-4">
            <a
              className="icon-box card card-body border-0 shadow-sm card-hover h-100 text-center"
              href="mailto:example@email.com"
            >
              <div className="icon-box-media bg-faded-accent text-accent rounded-circle mx-auto mb-3">
                <i className="fi-mail" />
              </div>
              <span className="d-block mb-1 text-body">Drop us a line</span>
              {/* <h3 className="h4 icon-box-title mb-0 opacity-90">
                example@email.com
              </h3> */}
            </a>
          </div>
          <div className="col-md-4">
            <a
              className="icon-box card card-body border-0 shadow-sm card-hover h-100 text-center"
              href="tel:4065550120"
            >
              <div className="icon-box-media bg-faded-success text-success rounded-circle mx-auto mb-3">
                <i className="fi-device-mobile" />
              </div>
              <span className="d-block mb-1 text-body">Call us any time</span>
              {/* <h3 className="h4 icon-box-title mb-0 opacity-90">
                (406) 555-0120
              </h3> */}
            </a>
          </div>
          <div className="col-md-4">
            <a
              className="icon-box card card-body border-0 shadow-sm card-hover h-100 text-center"
              href="#"
            >
              <div className="icon-box-media bg-faded-warning text-warning rounded-circle mx-auto mb-3">
                <i className="fi-instagram" />
              </div>
              <span className="d-block mb-1 text-body">Follow us</span>
              {/* <h3 className="h4 icon-box-title mb-0 opacity-90">
                @finder_directory
              </h3> */}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
