import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import About from "./pages/About.jsx";
import { DataContextProvider } from "./contexts/Data.context.jsx";
import Profile from "./pages/Profile.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import Shop from "./pages/Shop.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route element={<PrivateRoutes />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<AuthRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>
);
