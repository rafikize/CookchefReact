import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import { ApiContext } from "./context/ApiContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApiContext.Provider value="https://restapi.fr/api/recipes">
      <RouterProvider router={router} />
    </ApiContext.Provider>
  </StrictMode>
);
