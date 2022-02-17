import React from "react";
import DashboardListingItem from "./DashboardListingItem";
import Skeleton from "react-loading-skeleton";
import { Nav, Tab, Tabs } from "react-bootstrap";

const DashboardListingContainer = ({ listings = [] }) => {
  const activeListing = () =>
    listings.filter((list) => list.status === "active");

  const pendingListing = () =>
    listings.filter((list) => list.status === "pending");

  const expiredListing = () =>
    listings.filter((list) => list.status === "expired");

  const archivedListing = () =>
    listings.filter((list) => list.status === "archived");

  return listings.length < 0 ? (
    <Skeleton count={5} />
  ) : (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="all">
        <Nav
          fill
          variant="primary"
          // variant="pills"
          className="nav-tabs border-bottom mb-4"
        >
          <Nav.Item className="nav-item mb-3">
            <Nav.Link eventKey="all">
              <i className="fas fa-file fs-base me-2" />
              All Listing{" "}
              <span className="badge rounded-pill bg-info">
                {listings.length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item mb-3">
            <Nav.Link eventKey="active">
              <i className="fas fa-globe-africa fs-base me-2" />
              Active{" "}
              <span className="badge rounded-pill bg-primary">
                {activeListing().length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item mb-3">
            <Nav.Link eventKey="pending">
              <i className="fas fa-file fs-base me-2" />
              Pending{" "}
              <span className="badge rounded-pill bg-warning text-dark">
                {pendingListing().length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item mb-3">
            <Nav.Link eventKey="expired">
              <i className="fas fa-globe-africa fs-base me-2" />
              Expired{" "}
              <span className="badge rounded-pill bg-danger">
                {expiredListing().length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item mb-3">
            <Nav.Link eventKey="archived">
              <i className="fas fa-globe-africa fs-base me-2" />
              Archived{" "}
              <span className="badge rounded-pill bg-dark">
                {archivedListing().length}
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="all">
            <div className="row">
              {listings.map((list) => (
                <DashboardListingItem listing={list} key={list._id} />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="active">
            <div className="row">
              {activeListing().map((list) => (
                <DashboardListingItem listing={list} key={list._id} />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="pending">
            <div className="row">
              {pendingListing().map((list) => (
                <DashboardListingItem listing={list} key={list._id} />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="expired">
            <div className="row">
              {expiredListing().map((list) => (
                <DashboardListingItem listing={list} key={list._id} />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="archived">
            <div className="row">
              {archivedListing().map((list) => (
                <DashboardListingItem listing={list} key={list._id} />
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <style jsx>{`
        .nav-item {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default DashboardListingContainer;
