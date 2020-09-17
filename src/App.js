import React from "react";
import Header from "./components/header/Header";
import SearchGallery from "./components/search-gallery/SearchGallery";
import Providers from "./components/store";
import "./app.css";

function App() {
  return (
    <div className="app-root">
      <Providers>
        <Header />
        <div className="app-content">
          <SearchGallery />
        </div>
      </Providers>
    </div>
  );
}

export default App;
