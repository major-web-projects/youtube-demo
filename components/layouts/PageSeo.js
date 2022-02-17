import React from "react";
import Head from "next/head";

const PageSeo = ({
  title,
  description,
  siteName,
  image,
  imageAlt,
  keywords,
}) => {
  return (
    <Head>
      <title>{title} - My Clothing Store</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta rel="icon" href="/favicon.ico" />
      {/* Facebook's Open Graph */}
      <meta property="og:title" content={`${title} - My Clothing Store`} />
      <meta property="og:description" content={`Learn more about ${title}`} />
      <meta property="og:url" content={`url`} />
      <meta property="og:type" content="website" />
      {/* Facebook's Open Graph */}
      <meta property="og:type" content="website" />{" "}
      <meta property="og:site_name" content={title} />{" "}
      <meta property="og:description" content={description} />{" "}
      <meta property="og:image" content={image} />{" "}
      <meta property="og:image:alt" content={imageAlt} />{" "}
      <meta property="og:locale" content="en_CA" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />{" "}
      <meta name="twitter:description" content={description} />{" "}
      <meta name="twitter:image" content={image} />{" "}
      <meta name="twitter:image:alt" content={imageAlt} />
    </Head>
  );
};

export default PageSeo;
