import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import PageLayout from "../PageLayout";

const UserSignInLayout = ({ children, user = {} }) => {
  return (
    <PageLayout>
      <main className="page-wrapper">
        <div className="container">
          {/* Breadcrumb*/}
          <Breadcrumbs />
          {/* Page content*/}
          <div className="row">
            <div className="col-12 mb-5">{children}</div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default UserSignInLayout;
