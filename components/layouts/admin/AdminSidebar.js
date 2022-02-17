import { Collapse } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";
import AdminEditProfileModel from "./AdminEditProfileModel";
import Image from "next/image";

const AdminSidebar = ({ user = {} }) => {
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const toggleShowModel = () => setShowModel(!showModel);

  return (
    <aside className="col-lg-4 col-md-5 pe-xl-4 mb-5">
      {/* Account nav*/}
      <div className="card card-body border-0 shadow-sm pb-1 me-lg-1">
        <div className="d-flex align-items-start justify-content-between pb-4 mb-2">
          <div className="d-flex align-items-start">
            <div className="position-relative flex-shrink-0">
              <Image
                height="80px"
                width="80px"
                className="rounded-circle"
                src={user?.avatar.full_url || "/images/defaults/avatar.jpg"}
                alt={`${user.name} || user logo`}
              />

              <button
                onClick={toggleShowModel}
                className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm position-absolute end-0 bottom-0"
              >
                <i className="fas fa-camera fs-xs" />
              </button>
            </div>
            <div className="ps-3 ps-sm-4">
              <h3 className="h5">{user?.name || "user name"}</h3>
              <ul className="list-unstyled fs-sm mb-0">
                <li className="d-flex text-nav text-break">
                  <i className="fas fa-envelope opacity-60 mt-1 me-2" />
                  <span>{user?.email}</span>
                </li>
                <li className="d-flex text-nav text-break">
                  <i className="fas fa-phone opacity-60 mt-1 me-2" />
                  <span>{user?.phone}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <a
          className="btn btn-outline-secondary d-block d-md-none w-100 mb-3"
          onClick={() => setOpen(!open)}
          aria-controls="account-nav"
          aria-expanded={open}
        >
          <i className="fas fa-align-justify me-2" />
          Menu
        </a>
        <Collapse in={open} className="d-md-block mt-3" id="account-nav">
          <div className="nav flex-column card-nav">
            <li>
              <div className="card-nav-link ">
                <i className="fas fa-tachometer-alt opacity-60 me-2"></i>
                Admin Dashboard
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link card-nav-link active"
                href="https://finder.createx.studio/real-estate-account-info.html"
              >
                <i className="fas fa-user opacity-60 me-2" />
                Personal Info
              </a>
            </li>
            <li>
              <Link href="/admin/orders">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Orders
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/categories">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Categories
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/subs">
                <a className="card-nav-link">
                  <i className="fas fa-stream opacity-60 me-2"></i>
                  Sub Categories
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/listings">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  My Listings
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/coupons">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Coupons
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Users
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/cities">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Cities
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/provinces">
                <a className="card-nav-link">
                  <i className="fas fa-list opacity-60 me-2" />
                  Provinces
                </a>
              </Link>
            </li>
            <li>
              <a
                className="card-nav-link"
                href="https://finder.createx.studio/real-estate-account-wishlist.html"
              >
                <i className="fas fa-heart opacity-60 me-2" />
                Wishlist
              </a>
            </li>
            <li>
              <Link href="/dashboard/notifications">
                <a className="card-nav-link">
                  <i className="fas fa-star opacity-60 me-2" />
                  Reviews
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/notifications">
                <a className="card-nav-link">
                  <i className="fas fa-bell opacity-60 me-2" />
                  Notifications
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings">
                <a className="card-nav-link">
                  <i className="fas fa-lock opacity-60 me-2" />
                  Security
                </a>
              </Link>
            </li>
            <li>
              <a className="card-nav-link" href="#">
                <i className="fas fa-sign-out-alt opacity-60 me-2" />
                Sign Out
              </a>
            </li>
          </div>
        </Collapse>
      </div>
      <AdminEditProfileModel show={showModel} handleClose={toggleShowModel} />
    </aside>
  );
};

export default AdminSidebar;
