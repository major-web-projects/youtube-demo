import React from "react";
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
const PageLoader = () => {
  return (
    <div style={styles.container}>
      <h3>
        <i className="spinner-border text-dark"></i> Loading...
      </h3>
    </div>
  );
};

export default PageLoader;
