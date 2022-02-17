import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardListingFormEdit from "../../../components/dashboard/listings/DashboardListingFormEdit";
import UserFullLayout from "../../../components/layouts/users/UserFullLayout";
import categoryAction from "../../../store/actions/categoryAction";
import listingAction from "../../../store/actions/listingAction";

const DashboardListingEditPage = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const loadCategories = () => dispatch(categoryAction.list());

  const router = useRouter();
  const listingId = router.query.listingId;
  const { listingRead, isListingLoading } = useSelector(
    (state) => state.listing
  );
  const loadListing = () => dispatch(listingAction.read(listingId));
  const loadClear = () => dispatch(listingAction.clear());

  useEffect(() => {
    loadListing();
    return () => {
      loadClear();
    };
  }, [listingId]);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="listings-new">
      {/* Name*/}

      <div className="d-flex align-items-center justify-content-between col-12 mb-3">
        <h1 className="h2 mb-0">Edit Listing</h1>

        {listingRead && (
          <Link href={`/dashboard/listings/${listingRead._id}`}>
            <a className="btn btn-secondary">
              <i className="fas fa-undo me-2" />
              Back
            </a>
          </Link>
        )}
      </div>
      {/* form*/}
      {listingRead && (
        <DashboardListingFormEdit
          categories={category.categoryList}
          listing={listingRead}
        />
      )}
    </div>
  );
};

DashboardListingEditPage.PageLayout = UserFullLayout;
export default DashboardListingEditPage;
