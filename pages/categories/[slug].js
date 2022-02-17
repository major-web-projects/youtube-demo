import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/layouts/PageLoader";
import ListingContainer from "../../components/listings/ListingContainer";
import listingAction from "../../store/actions/listingAction";
import categoryAction from "../../store/actions/categoryAction";
import CategoryLayout from "../../components/categories/CategoryContainer";
import CategoryContainer from "../../components/categories/CategoryContainer";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug, categoryName, keyword, category, province, city } =
    router.query;

  const { categoryRead, isCategoryLoading } = useSelector(
    (state) => state.category
  );
  const { listingList, meta, isListingLoading } = useSelector(
    (state) => state.listing
  );

  const loadCategory = useCallback(() => {
    return dispatch(categoryAction.categoryBySlug(slug));
  }, [slug, dispatch]);

  const loadListings = () =>
    dispatch(listingAction.list({ keyword, category, province, city }));

  const onPageChanged = (data) => {
    dispatch(listingAction.list({ page: data.currentPage }));
  };

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  return categoryRead ? (
    <CategoryContainer category={categoryRead} />
  ) : (
    <PageLoader />
  );
};

export default CategoryPage;
