import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ListingSingleContainer from "../../components/listings/ListingSingleContainer";
import listingAction from "../../store/actions/listingAction";

const ListingPage = ({ listing: { listingRead }, listingReadAction }) => {
  const router = useRouter();
  const slug = router.query.slug;
  const readListings = (id) => {
    listingReadAction(id).catch((error) => toast.error(error));
  };
  useEffect(() => {
    slug && readListings(slug);
  }, [slug]);

  return <>{listingRead && <ListingSingleContainer listing={listingRead} />}</>;
};

export default connect(
  (state) => ({
    listing: state.listing,
  }),
  {
    listingReadAction: listingAction.listingBySlug,
  }
)(ListingPage);
