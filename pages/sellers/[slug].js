import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/layouts/PageLoader";
import userAction from "../../store/actions/userAction";
import SellerContainer from "../../components/users/SellerContainer";
import UserFullLayout from "../../components/layouts/users/UserFullLayout";

const SellerPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const { userRead, isUserLoading } = useSelector((state) => state.user);
  const loadUser = useCallback(() => {
    return dispatch(userAction.userBySlug(slug));
  }, [slug]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return userRead ? <SellerContainer user={userRead} /> : <PageLoader />;
};

SellerPage.PageLayout = UserFullLayout;
export default SellerPage;
