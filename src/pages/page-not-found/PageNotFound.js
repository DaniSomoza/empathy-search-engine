import React from "react";
import "./pagenotfound.css";

function PageNotFound() {
  return (
    <div className={"not-found-root"} id={"page-not-found-root"}>
      <h2 id={"page-not-found-title"} className={"not-found-title"}>
        {"Sorry Page not found"}
      </h2>
    </div>
  );
}

export default PageNotFound;
