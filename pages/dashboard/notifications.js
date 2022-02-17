import React from "react";
import UserLayout from "../../components/layouts/users/UserLayout";

const DashboardNotificationsPage = () => {
  return (
    <div className="notifications">
      <h1 className="h2">Notifications</h1>
      <p className="pt-1 mb-4">
        Get real-time updates on your favorite homes, neighborhoods, and more.
      </p>
      {/* Nav tabs*/}
      <ul
        className="nav nav-tabs flex-column flex-sm-row align-items-stretch align-items-sm-start border-bottom mb-4"
        role="tablist"
      >
        <li className="nav-item me-sm-3 mb-3">
          <a
            className="nav-link text-center"
            href="#notifications-rent"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="notifications-rent"
            aria-selected="false"
          >
            Rent notifications
          </a>
        </li>
        <li className="nav-item mb-3">
          <a
            className="nav-link text-center active"
            href="#notifications-sale"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="notifications-sale"
            aria-selected="true"
          >
            Sale notifications
          </a>
        </li>
      </ul>
      {/* Tabs content*/}
      <div className="tab-content py-2" id="notification-settings">
        {/* Rent notifications tab*/}
        <div className="tab-pane fade" id="notifications-rent" role="tabpanel">
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">New rental alerts</h6>
              <p className="fs-sm mb-0">
                New rentals that match your{" "}
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="new-rental"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="new-rental" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">Rental status updates</h6>
              <p className="fs-sm mb-0">
                Updates like price changes and off-market status on your{" "}
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="rental-update"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="rental-update" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">Finder recommendations</h6>
              <p className="fs-sm mb-0">
                Rentals we think you will like. These recommendations may be
                slightly outside your search criteria
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="rental-recomendation"
              />
              <label
                className="form-check-label"
                htmlFor="rental-recomendation"
              />
            </div>
          </div>
        </div>
        {/* Sale notifications tab*/}
        <div
          className="tab-pane fade active show"
          id="notifications-sale"
          role="tabpanel"
        >
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">New sale alerts</h6>
              <p className="fs-sm mb-0">
                New sales that match your{" "}
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="new-sale"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="new-sale" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">Sale status updates</h6>
              <p className="fs-sm mb-0">
                Updates like price changes and off-market status on your{" "}
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="sale-update"
              />
              <label className="form-check-label" htmlFor="sale-update" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="me-2">
              <h6 className="mb-1">Finder recommendations</h6>
              <p className="fs-sm mb-0">
                Sales we think you will like. These recommendations may be
                slightly outside your search criteria
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="sale-recomendation"
              />
              <label
                className="form-check-label"
                htmlFor="sale-recomendation"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <div className="me-2">
            <h6 className="mb-1">Featured news</h6>
            <p className="fs-sm mb-0">News and tips you may be interested in</p>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="featured-news"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="featured-news" />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <div className="me-2">
            <h6 className="mb-1">Finder extras</h6>
            <p className="fs-sm mb-0">
              Occasional notifications about new features to make finding the
              perfect rental easy
            </p>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="extras" />
            <label className="form-check-label" htmlFor="extras" />
          </div>
        </div>
      </div>
      <div className="border-top pt-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="all-notifications"
            data-master-checkbox-for="#notification-settings"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="all-notifications">
            Enable / disable all notifications
          </label>
        </div>
      </div>
    </div>
  );
};

DashboardNotificationsPage.PageLayout = UserLayout;
export default DashboardNotificationsPage;
