import { useRouter } from "next/router";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import PageAuth from "../PageAuth";
import PageLayout from "../PageLayout";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children, user = {} }) => {
  const router = useRouter();

  if (user.role !== "admin") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <PageLayout>
      <div className="container-fluid ">
        {/* Breadcrumb*/}
        <Breadcrumbs />
        {/* Page content*/}
        <div className="row">
          <AdminSidebar user={user} />
          <div className="col-lg-8 col-md-7 mb-5">{children}</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PageAuth(AdminLayout);
