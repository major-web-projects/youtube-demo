import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/layouts/PageLoader";
import CategoryGripItem from "../../components/categories/CategoryGripItem";
import categoryAction from "../../store/actions/categoryAction";
import Link from "next/link";
import Breadcrumbs from "../../components/layouts/Breadcrumbs";

const CategorysIndexPage = () => {
  const { categoryList, isCategoryLoading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  const loadCategory = () => dispatch(categoryAction.list());

  useEffect(() => {
    loadCategory();
  }, []);

  if (isCategoryLoading) {
    return <PageLoader />;
  }

  return (
    <section className="container  mt-5 mb-2 pt-5">
      <div className="mb-3 pt-md-2">
        <Breadcrumbs />
      </div>
      {/* Name*/}
      <div className="d-sm-flex align-items-center justify-content-between border-bottom pb-3 pb-sm-4">
        <h1 className="h2 mb-sm-0">
          Find <span className="count">Nomayini</span> By Category Near You
        </h1>
      </div>
      <div className="row pt-3">
        {categoryList.map((category) => (
          <CategoryGripItem category={category} key={category._id} />
        ))}
      </div>
    </section>
  );
};

export default CategorysIndexPage;
