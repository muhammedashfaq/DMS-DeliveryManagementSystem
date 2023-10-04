import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  ProtectedRoutesUser,
  ProtectedRoutesAdmin,
  ProtectedRoutesdriver,
} from "./protectedRoutes";
import {
  PublicRoutesUser,
  PublicRoutesAdmin,
  PublicRoutesdriver,
} from "./publicRoutes";

import Landingpage from "../pages/user/Homepage/landingpage";
import Register from "../pages/user/register";
import Otp from "../pages/user/otp";
import Forget from "../pages/user/forget";
import Hublogin from "../pages/driver/login";
import Adminlogin from "../pages/admin/login";
import AdminHome from "../pages/admin/Home/Home";
import HubHome from "../pages/driver/home";
import Hubtrack from "../pages/driver/hubTrack";
import UserProfile from "../pages/user/UserProfile/userProfile";
import BookShipment from "../pages/user/Bookshipment/BookShipment";
import UserContactForm from "../pages/user/UserContactform/userContactform";
import Reset from "../pages/user/forget2";
import NotFound from "../pages/404/404"
import AdminReset from "../pages/admin/resetpassword"
import AdminForget from "../pages/admin/forgetpassword"


import { RouteObjects } from "./RouteObject";

const AppRoutes = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center bg-slate-950 opacity-60 fixed top-0 left-0 w-full h-full z-50 space-x-3">
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white"></div>
        </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        
        {/* USER_SIDE ----------------------------------------------------------------------- */}


        <Route
         path={RouteObjects.Register}
          element={
            <PublicRoutesUser>
              <Register />{" "}
            </PublicRoutesUser>
          }
        />
        <Route
          path={RouteObjects.OTP}
          element={
            <PublicRoutesUser>
              <Otp />
            </PublicRoutesUser>
          }
        />


        <Route
          path={RouteObjects.ForgetPassword}
          element={
            <PublicRoutesUser>
              <Forget />
            </PublicRoutesUser>
          }
        />
        <Route
          path={RouteObjects.ResetPassword}
          element={
            <PublicRoutesUser>
              <Reset />
            </PublicRoutesUser>
          }
        />
        <Route path="/" element={<Landingpage />} />

        <Route
          path={RouteObjects.UserProfile}
          element={
            <ProtectedRoutesUser>
              <UserProfile />
            </ProtectedRoutesUser>
          }
        />
        <Route
          path={RouteObjects.BookShipment}
          element={
            <ProtectedRoutesUser>
              <BookShipment />{" "}
            </ProtectedRoutesUser>
          }
        />
        <Route
          path={RouteObjects.contact}
          element={
            <ProtectedRoutesUser>
              <UserContactForm />{" "}
            </ProtectedRoutesUser>
          }
        />

        {/* ADMIN_SIDE ------------------------------------------------------------------------*/}
        <Route
          path={RouteObjects.AdminLogin}
          element={
            <PublicRoutesAdmin>
              <Adminlogin />
            </PublicRoutesAdmin>
          }
        />

<Route
          path={RouteObjects.AdminForget}
          element={
            <PublicRoutesAdmin>
              <AdminForget />
            </PublicRoutesAdmin>
          }
        />
        <Route
          path={RouteObjects.AdminReset}
          element={
            <PublicRoutesAdmin>
              <AdminReset />
            </PublicRoutesAdmin>
          }
        />
        <Route
          path={RouteObjects.Adminhome}
          element={
            <ProtectedRoutesAdmin>
              <AdminHome />{" "}
            </ProtectedRoutesAdmin>
          }
        />

        {/* DRIVER_SIDE ----------------------------------------------------------------*/}

        <Route
          path={RouteObjects.HubLogin}
          element={
            <PublicRoutesdriver>
              <Hublogin />
            </PublicRoutesdriver>
          }
        />

        <Route
          path={RouteObjects.HubHome}
          element={
            <ProtectedRoutesdriver>
              <HubHome />
            </ProtectedRoutesdriver>
          }
        />

        <Route
          path={RouteObjects.HubTracking}
          element={
            <ProtectedRoutesdriver>
              <Hubtrack />
            </ProtectedRoutesdriver>
          }
        />
                <Route path="*" element={<NotFound/>} />
          
      </Routes>
    </div>
  );
};

export default AppRoutes;
