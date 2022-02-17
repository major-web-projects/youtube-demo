import React, { useCallback, useEffect, useState } from "react";
import CategorySidebar from "./CategorySidebar";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../layouts/Breadcrumbs";
import listingAction from "../../store/actions/listingAction";
import ListingContainer from "../listings/ListingContainer";
import { useRouter } from "next/router";

const CategoryContainer = ({ category }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [price, setPrice] = useState({ gte: "", lte: "" });
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const page = router.query.page;

  const { listingList, meta } = useSelector((state) => state.listing);

  const loadListings = () => {
    return dispatch(
      listingAction.list({
        page,
        category: category._id,
        price,
        keyword,
      })
    );
  };

  useEffect(() => {
    loadListings();
  }, [page, category, price, keyword]);

  return (
    <div className="container mt-5 mb-2 pt-5">
      <div className="row g-0 mt-n3">
        <CategorySidebar
          category={category}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          price={price}
          keyword={keyword}
          setPrice={setPrice}
          setKeyword={setKeyword}
        />
        {/* Page content*/}
        <div className="col-lg-8 col-xl-9 position-relative overflow-hidden  border-start-lg pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
          {/* Breadcrumb*/}
          <Breadcrumbs />
          {/* Name*/}
          <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
            <h1 className="h2 mb-sm-0">{category.name}</h1>
          </div>
          <ListingContainer
            listings={listingList}
            meta={meta}
            onPageChanged={(data) => data}
          />
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm w-100 rounded-0 fixed-bottom d-lg-none"
        type="button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <i className="fi-filter me-2" />
        Filters
      </button>
    </div>
  );
};

export default CategoryContainer;
