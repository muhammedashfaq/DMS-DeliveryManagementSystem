import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Landingpage from "./pages/landingpage";
import Register from "./pages/user/register";
import Otp from "./pages/user/otp";
import Forget from "./pages/user/forget";
import Dlogin from "./pages/driver/login";
import Adminlogin from "./pages/admin/login";
import AdminHome from "./pages/admin/Home/Home";
import Home from "./pages/user/Home/Home";
import { UserProvider } from "./context/userContext";
import DriverHome from "./pages/driver/home";

import Reset from "./pages/user/forget2";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  ProtectedRoutesUser,
  ProtectedRoutesAdmin,
} from "./components/Routes/protectedRoutes";
import {
  PublicRoutesUser,
  PublicRoutesAdmin,
} from "./components/Routes/publicRoutes";
const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (

    <UserProvider> 

    <BrowserRouter>
      {loading && (
        <div className="flex justify-center items-center bg-slate-950 opacity-60 fixed top-0 left-0 w-full h-full z-50 space-x-3">
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white"></div>
        </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutesUser>
              {" "}
              <Landingpage />{" "}
            </PublicRoutesUser>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutesUser>
              {" "}
              <Login />{" "}
            </PublicRoutesUser>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutesUser>
              <Register />{" "}
            </PublicRoutesUser>
          }
        />
        <Route
          path="/Home"
          element={
            <ProtectedRoutesUser>
              {" "}
              <Home />{" "}
            </ProtectedRoutesUser>
          }
        />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="/dlogin" element={<Dlogin />} />
        <Route path="/driverhome" element={<DriverHome />} />

        <Route
          path="/admin"
          element={
            <PublicRoutesAdmin>
              <Adminlogin />
            </PublicRoutesAdmin>
          }
          />
        <Route
          path="/adminhome*"
          element={
            <ProtectedRoutesAdmin>
              <AdminHome />{" "}
            </ProtectedRoutesAdmin>
          }
          />
        {/* <Route path='/user_details' element={<ProtectedRoutesAdmin><UserDetails/> </ProtectedRoutesAdmin>}/>
         <Route path='/driver_details' element={<ProtectedRoutesAdmin><DriverDetails/> </ProtectedRoutesAdmin>}/>
         <Route path='/shipment_details' element={<ProtectedRoutesAdmin><ShipmentDetails/> </ProtectedRoutesAdmin>}/>
        */}
      </Routes>
    </BrowserRouter>
        </UserProvider>
  );
};

export default App;
