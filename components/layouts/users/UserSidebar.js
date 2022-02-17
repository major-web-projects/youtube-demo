import React, { useState } from "react";

import PageLink from "../PageLink";
import { useDispatch } from "react-redux";
import { signoutAction } from "../../../store/actions/authAction";
import UserHeader from "./UserHeader";

const UserSidebar = ({ user = {} }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const toggleShowModel = () => setShowModel(!showModel);

  return (
    <aside className="col-lg-3 col-md-4 pe-xl-3 mb-5 d-none d-md-block">
      {/* Account nav*/}
      <div className="card card-body pt-0 border-0 shadow-sm pb-1 me-lg-1 mb-3">
        <UserHeader user={user} />
        {/* <a
          className="btn btn-outline-primary btn-lg rounded-pill w-100 d-md-none"
          onClick={() => setOpen(!open)}
          aria-controls="account-nav"
          aria-expanded={open}
        >
          <i className="fas fa-align-justify me-2" />
          Account Menu
        </a> */}
        <div className="nav flex-column">
          <li className="nav-item">
            <PageLink href="/dashboard">
              <a className="nav-link">
                <i className="fas fa-user opacity-60 me-2" />
                Account
              </a>
            </PageLink>
          </li>
          <li className="nav-item">
            <PageLink href="/dashboard/listings">
              <a className="nav-link">
                <i className="fas fa-list opacity-60 me-2" />
                My Listings
              </a>
            </PageLink>
          </li>
          <li className="nav-item">
            <PageLink href="/dashboard/settings">
              <a className="nav-link">
                <i className="fas fa-lock opacity-60 me-2" />
                Security
              </a>
            </PageLink>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(signoutAction())}
            >
              <i className="fas fa-sign-out-alt opacity-60 me-2" />
              Sign Out
            </a>
          </li>
        </div>
      </div>
      {user.role == "admin" && (
        <div className="card card-body pt-0 border-0 shadow-sm pb-1 me-lg-1">
          <ul className="nav flex-column">
            <h1 className="h6">Admin Dashboard</h1>
            <li className="nav-item">
              <PageLink href="/dashboard/listings/admin">
                <a className="nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Listings
                </a>
              </PageLink>
            </li>
            <li className="nav-item">
              <PageLink href="/dashboard/categories">
                <a className="nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Categories
                </a>
              </PageLink>
            </li>

            <li className="nav-item">
              <PageLink href="/dashboard/users">
                <a className="nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Users
                </a>
              </PageLink>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default UserSidebar;
