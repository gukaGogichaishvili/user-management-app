import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { UserListProvider } from "./context/UserListContext.jsx";
import { RedirectProvider } from "./context/RedirectContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserListProvider>
        <RedirectProvider>
          <App />
        </RedirectProvider>
      </UserListProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
