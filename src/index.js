import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const defaultState = {
  isEditMode: false
};

const cache = new InMemoryCache();

persistCache({
  // save cache to loacl storage
  cache,
  storage: window.localStorage
}).then(() => {
  // load cache from local storage, then load the app

  const client = new ApolloClient({
    cache, // persisted cache
    uri: "https://api-uswest.graphcms.com/v1/cjl7c5z84014701e3zhxzy3yd/master",
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
  registerServiceWorker();
});
