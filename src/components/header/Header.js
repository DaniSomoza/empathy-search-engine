import React from "react";
import "./header.css";
import SearchEngine from "../search-engine/SearchEngine";

function Header() {
  return (
    <header className="header-root">
      <SearchEngine />
    </header>
  );
}

export default Header;
