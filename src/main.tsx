import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { AppRouter } from "./router";
import { client } from "./apollo-client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </React.StrictMode>
  
);