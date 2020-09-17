import React, { useEffect } from "react";
import { generateAccessToken } from "../../http/auth/auth";
import Api from "../../http/Api";

const AuthorizationContext = React.createContext();

function useAuthorization() {
  const context = React.useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      "[STATE ERROR] useAuthorization must be used within a AuthorizationContext"
    );
  }

  return context;
}

function AuthorizationProvider(props) {
  useEffect(() => {
    async function performGenerateAccessToken() {
      const { access_token: accessToken } = await generateAccessToken();
      Api.setAccessToken(accessToken);
    }
    performGenerateAccessToken();
  }, []);

  const state = {
    ...props.store,
  };

  return <AuthorizationContext.Provider value={state} {...props} />;
}

export { useAuthorization, AuthorizationProvider };
