import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import PageAuth from "../PageAuth";
import PageLayout from "../PageLayout";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";

const UserFullLayout = ({ children, user = {} }) => {
  return (
    <PageLayout>
      <div className="container mt-5 mb-2 pt-5">
        {/* Breadcrumbs*/}
        <Breadcrumbs />

        {children}
      </div>
    </PageLayout>
  );
};

export default PageAuth(UserFullLayout);
