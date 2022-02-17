import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardListingForm from "../../../components/dashboard/listings/DashboardListingForm";
import UserFullLayout from "../../../components/layouts/users/UserFullLayout";
import categoryAction from "../../../store/actions/categoryAction";

const DashboardListingNewPage = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const loadCategories = () => dispatch(categoryAction.list());

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="listings-new">
      {/* Name*/}
      <div className="d-flex align-items-center justify-content-between col-12 mb-3">
        <h1 className="h2 mb-0">Add Listing</h1>

        <Link href="/dashboard/listings">
          <a className="btn btn-secondary">
            <i className="fas fa-undo me-2" />
            Back
          </a>
        </Link>
      </div>
      {/* form*/}
      <DashboardListingForm categories={category.categoryList} />
    </div>
  );
};

DashboardListingNewPage.PageLayout = UserFullLayout;
export default DashboardListingNewPage;
