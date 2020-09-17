import React from "react";
import { SearchProvider } from "./searchContext";
import { AuthorizationProvider } from "./authorizationContext";

function Providers({ children, store = {} }) {
  return (
    <AuthorizationProvider store={store.authorization}>
      <SearchProvider store={store.search}>{children}</SearchProvider>
    </AuthorizationProvider>
  );
}

export default Providers;
