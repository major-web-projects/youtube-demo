import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardListingSingleContainer from "../../../components/dashboard/listings/DashboardListingSingleContainer";
import UserLayout from "../../../components/layouts/users/UserLayout";
import listingAction from "../../../store/actions/listingAction";

const DashboardListingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listingId = router.query.listingId;
  const { listingRead, isListingLoading } = useSelector(
    (state) => state.listing
  );
  const loadListing = () => dispatch(listingAction.read(listingId));

  useEffect(() => {
    loadListing();
  }, [listingId]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      {listingRead && <DashboardListingSingleContainer listing={listingRead} />}
    </>
  );
};

DashboardListingPage.PageLayout = UserLayout;
export default DashboardListingPage;
