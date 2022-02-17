import Head from "next/head";
import PageFooter from "./PageFooter";
import PageNavbar from "./PageNavbar";

export default function PageLayout({ children, padding = "" }) {
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <PageNavbar />
      <main className={`page-wrapper min-vh-100`}>{children}</main>
      <PageFooter />
    </>
  );
}
