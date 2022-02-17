import Image from "next/image";
import React, { useState } from "react";

const UserHeader = ({ user = {} }) => {
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const toggleShowModel = () => setShowModel(!showModel);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
        <div className="d-flex align-items-start">
          <div className="position-relative flex-shrink-0">
            <Image
              height="80px"
              width="80px"
              className="rounded-circle"
              src={user?.avatar.full_url || "/images/defaults/avatar.jpg"}
              alt={`${user.name}` || "logo"}
            />

            <button
              onClick={toggleShowModel}
              className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm position-absolute end-0 bottom-0"
            >
              <i className="fas fa-camera fs-xs" />
            </button>
          </div>
          <div className="ps-3 ps-sm  fs-sm">
            <h3 className="h5 mb-0">{user?.name || "user name"}</h3>
            <ul className="list-unstyled fs-sm mb-0">
              <li className="d-flex text-nav text-break fs-sm">
                <i className="fas fa-envelope opacity-60 mt-1 me-2" />
                <span>{user?.email || "Not specified"}</span>
              </li>
              <li className="d-flex text-nav text-break fs-sm">
                <i className="fas fa-phone opacity-60 mt-1 me-2" />
                <span>{user?.contacts?.phone || "Not specified"}</span>
              </li>
            </ul>
          </div>
        </div>
        <a className="btn btn-primary rounded-pill d-none d-md-block" href="#">
          <i className="fi-message mt-n1 me-2" />
          Message
        </a>
      </div>
    </>
  );
};

export default UserHeader;
