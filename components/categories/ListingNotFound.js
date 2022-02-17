import React from "react";
const styles = {
  container: {
    width: "100vw",
    height: "100vh",

    justifyContent: "center",
    alignItems: "center",
  },
};
const ListingNotFound = () => {
  return (
    <div style={styles.container}>
      <h1>No listings found </h1>
      <div>
        Try a new search. Check the spelling, change your filters or try a less
        specific search term.
      </div>
    </div>
  );
};

export default ListingNotFound;
