import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Host from "./pages/Host";
import Player from "./pages/Player";
import Screen from "./pages/Screen";
import History from "./pages/History";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/host", element: <Host /> },
  { path: "/play", element: <Player /> },
  { path: "/screen", element: <Screen /> },
  { path: "/history", element: <History /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
