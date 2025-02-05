import React, { Route, Routes } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { useAppSelector } from "./store/store";

// importing layouts
import Basic from "./layouts/Basic";

// importing pages
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import UpdatePassword from "./pages/updatePassword";

// const Login = React.lazy(()=>import('./pages/login'));

// importing components
import PublicRoute from "./components/auth/PublicRoutes";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/notfound";
import ResetPassword from "./pages/resetPassword";
import Profile from "./pages/profile";
import Dashboard from "./layouts/Dashboard";
import ForgotPassword from "./pages/forgotPassword";

// importing skeleton lodin pages
import ForgotPasswordSkeleton from "./pages/forgotPassword/ForgotPasswordSkeleton";
import LoginFormSkeleton from "./pages/login/LoginSkeleton";
import NotFoundSkeleton from "./pages/notfound/NotFoundSkeleton";
import ProfileSkeleton from "./pages/profile/ProfileSkeleton";
import SignupFormSkeleton from "./pages/register/RegisterFormSkeleton";
import ResetPasswordSkeleton from "./pages/resetPassword/ResetPasswordSkeleton";
import UpdatePasswordSkeleton from "./pages/updatePassword/UpdatePasswordSkeleton";



function App() {

  const authData = useAppSelector((store) => store.auth);

  // useState
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect
  useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated || false);
  }, [authData]);

  return (

    <Routes>
      <Route element={<Basic />}>
        {/* Home page ... */}
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />} >
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>


        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

      </Route>

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<h1>This is setting</h1>} />
        </Route>
      </Route>

      {/* Catch-All Route (404 Page) */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;