import React from "react";
import "./header.css";
import SearchEngine from "../search-engine/SearchEngine";
import empathyTextLogo from "../../assets/logo-text-empathy-white.svg";
import { useHistory } from "react-router-dom";
import scrollToTop from "../../helpers/scrollToTop";

function Header() {
  let history = useHistory();
  return (
    <header id={"app-header"} className="header-root">
      <img
        onClick={() => {
          history.push("/");
          scrollToTop();
        }}
        className={"empathy-text-logo"}
        src={empathyTextLogo}
        alt="Empathy text Logo"
      />
      <SearchEngine />
    </header>
  );
}

export default Header;
