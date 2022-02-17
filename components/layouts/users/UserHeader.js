import Image from "next/image";
import React, { useState } from "react";
import UserEditProfileModel from "./UserEditProfileModel";

const UserHeader = ({ user = {} }) => {
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const toggleShowModel = () => setShowModel(!showModel);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
        <div className="d-flex  align-items-start">
          <div className="position-relative flex-shrink-0">
            <Image
              height="60px"
              width="60px"
              className="rounded-circle"
              src={user?.avatar.full_url || "/images/defaults/avatar.jpg"}
              alt={`${user.name}` || "logo"}
            />

            <button
              onClick={toggleShowModel}
              className="btn btn-light btn-sm rounded-circle shadow-sm position-absolute end-0 bottom-0 p-0"
            >
              <i className="fas fa-camera fs-sm" />
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
      </div>
      {showModel && (
        <UserEditProfileModel
          show={showModel}
          handleClose={toggleShowModel}
          onHide={toggleShowModel}
        />
      )}
    </>
  );
};

export default UserHeader;
