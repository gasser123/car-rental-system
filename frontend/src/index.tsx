import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoggedContextProvider from "./store/LoggedContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoggedContextProvider>
      <App />
    </LoggedContextProvider>
  </React.StrictMode>
);
