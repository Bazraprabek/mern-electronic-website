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
import Layout from "./Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import { DataContextProvider } from "./contexts/Data.context.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/user/Home.jsx";
import Shop from "./pages/user/Shop.jsx";
import Cart from "./pages/user/Cart.jsx";
import Details from "./pages/user/Details.jsx";
import Search from "./pages/user/Search.jsx";
import Profile from "./pages/user/Profile.jsx";
import BuyNow from "./pages/user/BuyNow.jsx";
import About from "./pages/user/About.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="detail/:id" element={<Details />} />
        <Route path="search/:name" element={<Search />} />
        <Route element={<PrivateRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="buynow" element={<BuyNow />} />
        </Route>
      </Route>
      <Route path="/dashboard" element={<AdminRoutes />}>
        <Route index element={<Dashboard />} />
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
