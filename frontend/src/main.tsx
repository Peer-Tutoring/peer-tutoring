import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import "./main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import UnprotectedRoute from "./components/UnprotectedRoute.tsx";
import Loading from "./components/Loading.tsx";

const HomePage = lazy(() => import("./Root.tsx"));

const DashboardPage = lazy(() => import("@/routes/dashboard/page.tsx"));

const LoginPage = lazy(() => import("@/routes/auth/login/page.tsx"));
const RegisterPage = lazy(() => import("@/routes/auth/register/page.tsx"));
const ForgotPasswordPage = lazy(
  () => import("@/routes/auth/forgot-password/page.tsx"),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route element={<UnprotectedRoute />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);
