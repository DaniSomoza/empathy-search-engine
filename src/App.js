import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SearchGallery from "./components/search-gallery/SearchGallery";
import Providers from "./store";
import "./app.css";
import Api from "./http/Api";
import { generateAccessToken } from "./http/auth/auth";
import Album from "./pages/album/Album";
import Track from "./pages/track/Track";
import Artist from "./pages/artist/Artist";

function App() {
  useEffect(() => {
    async function performGenerateAccessToken() {
      const { access_token: accessToken } = await generateAccessToken();
      Api.setAccessToken(accessToken);
    }
    performGenerateAccessToken();
  }, []);

  // TODO: CREATE ROUTES FILE
  return (
    <div className="app-root">
      <Providers>
        <Header />
        <div id={"app-content"} className="app-content">
          <Router>
            <Switch>
              <Route path="/albums/:albumId">
                <Album />
              </Route>
              <Route path="/artists/:artistId">
                <Artist />
              </Route>
              <Route path="/tracks/:trackId">
                <Track />
              </Route>
              <Route path="/">
                <SearchGallery />
              </Route>
            </Switch>
          </Router>
        </div>
      </Providers>
    </div>
  );
}

export default App;
