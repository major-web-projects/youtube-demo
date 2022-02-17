import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import PageAuth from "../PageAuth";
import PageLayout from "../PageLayout";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";

const UserLayout = ({ children, user = {} }) => {
  return (
    <PageLayout>
      <div className="container mt-5 mb-2 pt-5">
        {/* Breadcrumbs*/}
        <Breadcrumbs />
        {/* Account header*/}
        {/* <UserHeader user={user} /> */}
        {/* Page content*/}
        <div className="row">
          {/* Sidebar*/}
          <UserSidebar user={user} />
          {/* Content*/}
          <div className="col-12 col-lg-9 col-md-8 d-flex flex-column">
            {children}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PageAuth(UserLayout);
