import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);
