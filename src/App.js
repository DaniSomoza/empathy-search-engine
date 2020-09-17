import React, { useEffect } from "react";
import Header from "./components/header/Header";
import SearchGallery from "./components/search-gallery/SearchGallery";
import { generateAccessToken } from "./http/auth/auth";
import "./app.css";
import Api from "./http/Api";

function App() {
  useEffect(() => {
    async function performGenerateAccessToken() {
      const { access_token: accessToken } = await generateAccessToken();
      Api.setAccessToken(accessToken);
    }
    performGenerateAccessToken();
  }, []);

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <SearchGallery />
      </div>
    </div>
  );
}

export default App;
