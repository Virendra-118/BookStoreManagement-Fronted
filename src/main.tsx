
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { AuthProvider } from "./Context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FluentProvider>
  </React.StrictMode>
);
