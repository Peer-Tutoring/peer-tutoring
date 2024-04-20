import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./Root.tsx";
import LoginPage from "@/routes/auth/login/page.tsx";
import RegisterPage from "@/routes/auth/register/page.tsx";
import ForgotPasswordPage from "@/routes/auth/forgot-password/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPasswordPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
