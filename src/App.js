import React from "react";
import Header from "./components/header/Header";
import SearchGallery from "./components/search-gallery/SearchGallery";
import Providers from "./store";
import "./app.css";

function App() {
  return (
    <div className="app-root">
      <Providers>
        <Header />
        <div id={"app-content"} className="app-content">
          <SearchGallery />
        </div>
      </Providers>
    </div>
  );
}

export default App;
