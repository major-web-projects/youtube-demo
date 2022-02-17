import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import ListingContainer from "../../components/listings/ListingContainer";
import listingAction from "../../store/actions/listingAction";
import { toast } from "react-toastify";
import ListingLayout from "../../components/layouts/listings/ListingLayout";
import { useRouter } from "next/router";

const ListingsIndexPage = ({
  listing: { listingList, meta },
  listingListAction,
}) => {
  const router = useRouter();
  const page = router.query.page;

  const loadListings = useCallback(() => {
    return listingListAction({
      page,
    }).catch((error) => toast.error(error));
  }, [page]);

  useEffect(() => {
    const delayed = setTimeout(() => {
      loadListings();
    }, 300);
    return () => {
      clearTimeout(delayed);
    };
  }, [loadListings]);

  return (
    <ListingContainer
      listings={listingList}
      meta={meta}
      onPageChanged={(data) => data}
    />
  );
};

ListingsIndexPage.PageLayout = ListingLayout;
export default connect(
  (state) => ({
    listing: state.listing,
  }),
  {
    listingListAction: listingAction.list,
  }
)(ListingsIndexPage);
