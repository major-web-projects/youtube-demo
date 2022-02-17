import React from "react";
import Image from "next/image";
import Link from "next/link";

const PageFooter = () => {
  return (
    <>
      <footer className="footer pt-4 pb-4 bg-dark text-light">
        <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between py-2">
          {/* Copyright*/}
          <p className="order-lg-1 order-2 fs-sm mb-2 mb-lg-0">
            <span className="text-light opacity-60">
              © All rights reserved.
            </span>
          </p>
          <div className="d-flex flex-lg-row flex-column align-items-center order-lg-2 order-1 ms-lg-4 mb-lg-0 mb-4">
            {/* Links*/}
            <div className="d-flex flex-wrap fs-sm mb-lg-0 mb-4 pe-lg-4">
              <a href="#" className="text-light px-2 mx-1">
                About
              </a>

              <a href="#" className="text-light px-2 mx-1">
                Contacts
              </a>

              <a href="#" className="text-light px-2 mx-1">
                Terms Of Use
              </a>

              <a href="#" className="text-light px-2 mx-1">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PageFooter;
