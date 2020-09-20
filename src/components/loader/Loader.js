import React from "react";
import loaderGif from "../../assets/loader-animated.gif";
import empathyTextLogo from "../../assets/logo-text-empathy.svg";
import "./loader.css";

function Loader({ children, isLoading }) {
  return isLoading ? (
    <div id={"app-loader"} className={"loader-container"}>
      <img className={"loader-img"} src={loaderGif} alt={"loader"} />
      <img
        className={"loader-text"}
        src={empathyTextLogo}
        alt="Empathy text Logo"
      />
    </div>
  ) : (
    children
  );
}

export default Loader;
