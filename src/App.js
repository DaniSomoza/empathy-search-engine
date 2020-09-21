import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Providers from "./store";
import "./app.css";
import Api from "./http/Api";
import { generateAccessToken } from "./http/auth/auth";
import { routes } from "./routes/routes";
import PageNotFound from "./pages/page-not-found/PageNotFound";

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
        <Router>
          <Header />
          <div id={"app-content"} className="app-content">
            <Switch>
              {routes.map((route) => (
                <Route key={route.pathname} path={route.path}>
                  <route.Component />
                </Route>
              ))}
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </Providers>
    </div>
  );
}

export default App;
