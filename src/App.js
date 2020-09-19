import React, { useEffect } from "react";
import Header from "./components/header/Header";
import SearchGallery from "./components/search-gallery/SearchGallery";
import Providers from "./store";
import "./app.css";
import Api from "./http/Api";
import { generateAccessToken } from "./http/auth/auth";

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
