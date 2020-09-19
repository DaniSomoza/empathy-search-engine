import React from "react";
import { SearchProvider } from "./searchContext";

function Providers({ children, store = {} }) {
  return <SearchProvider store={store.search}>{children}</SearchProvider>;
}

export default Providers;
