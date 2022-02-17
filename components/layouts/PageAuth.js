import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageLoader from "./PageLoader";

const PageAuth = (WrappedComponent) => {
  const HocComponent = ({ auth: { isAuthLoading, user }, ...props }) => {
    const router = useRouter();
    const [showUser, setshowUser] = useState(false);
    const redirect = router.query?.redirect;

    useEffect(() => {
      if (user) {
        setshowUser(true);
      } else {
        setshowUser(false);
      }
    }, [user]);

    if (isAuthLoading && !user) {
      return <PageLoader />;
    }

    if (!isAuthLoading && !user) {
      router.push(
        redirect ? `/auth/signin?redirect=${redirect}` : "/auth/signin"
      );
      return null;
    }

    return showUser && user ? (
      <WrappedComponent user={user} {...props} />
    ) : (
      <PageLoader />
    );
  };

  return HocComponent;
};

const PageAuth2 = (WrapperComponent) =>
  connect((state) => ({
    auth: state.auth,
  }))(PageAuth(WrapperComponent));

export const getServerSideProps = async (ctx) => {
  // const session = await ctx.req.headers["someTokenName"];

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/yourhomepage", //usually the login page
  //       permanent: false,
  //     },
  //   };
  // }

  console.log("fuck");
  return {
    props: {
      authenticated: true,
    },
  };
};
export default PageAuth2;
