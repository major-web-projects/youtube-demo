import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SSRProvider from "react-bootstrap/SSRProvider";

// local import
import wrapper from "../store";
import PageLayout from "../components/layouts/PageLayout";
import { currentUser } from "../store/actions/authAction";

// import css
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/globals.css";
import categoryAction from "../store/actions/categoryAction";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const Layout = Component.PageLayout || PageLayout;
  const loadUser = () => dispatch(currentUser());
  const loadCategories = () => dispatch(categoryAction.list());

  useEffect(() => {
    loadUser();
    loadCategories();
  }, []);

  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-center" />
      </Layout>
    </SSRProvider>
  );
}

export default wrapper.withRedux(MyApp);
