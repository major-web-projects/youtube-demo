import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ListingSingleSidebar = ({ user, listingId, listing, isAuth = false }) => {
  const dispatch = useDispatch();

  return (
    <>
      <aside className="col-lg-4 order-lg-2 pe-xl-4 mb-2">
        <div className="card mb-4 p-2 shadow-sm">
          <div className="card-body">
            <h2 className="h3 mb-4">Details</h2>

            <ul className="list-unstyled  py-2 mb-3 border-bottom">
              <li className="d-flex justify-content-between">
                <strong className="h5">Price:</strong>
                <span className="h5">R {listing?.price}</span>
              </li>

              <li className="d-flex justify-content-between">
                <strong>Category: </strong>
                <span className="opacity-70">{listing?.category?.name}</span>
              </li>

              <li className="d-flex justify-content-between">
                <strong>Views:</strong>
                <span className="opacity-70">{listing?.viewCount}</span>
              </li>
              <li className="d-flex justify-content-between">
                <strong>Subscribers:</strong>
                <span className="opacity-70"> {listing?.subscriberCount}</span>
              </li>

              <li className="d-flex justify-content-between">
                <strong>Videos:</strong>
                <span className="opacity-70"> {listing?.videoCount}</span>
              </li>
            </ul>
            <button
              className="btn btn-outline-dark w-100 btn-lg px-4 mb-4"
              type="button"
            >
              <i className="fas fa-envelope me-2" />
              Contact
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ListingSingleSidebar;
