import "./App.css";
import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import { getGlobalItem } from "./utils/utils";
import PrivateRoute from "./routes/PrivateRoute";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MainLayout = lazy(() => import("./pages/MainLayout"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));

function App() {
  const token = getGlobalItem("token");

  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />

            {/* Protected Routes with Common Layout */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product" element={<Product />} />
              </Route>
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
