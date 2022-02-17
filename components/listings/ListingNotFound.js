import React from "react";
const styles = {
  container: {
    width: "100vw",
    height: "100vh",

    justifyContent: "center",
    alignItems: "center",
  },
};
const ListingNotFound = ({
  title = "No listings found",
  description = "Try a new search. Check the spelling, change your filters or try a less   specific search term.",
}) => {
  return (
    <div style={styles.container}>
      <h1>{title}</h1>
      <div>{description}</div>
    </div>
  );
};

export default ListingNotFound;
