import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/store";

// importing layouts
import Basic from "./layouts/Basic";

// importing pages
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import UpdatePassword from "./pages/updatePassword";
import ErrorBoundary from "./components/ErrorBoundry";

// importing components
import PublicRoute from "./components/auth/PublicRoutes";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/notfound";
import { ThemeContexProvider } from './context/ThemeContext';
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";


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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>


        {/* Catch-All Route (404 Page) */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>

  );
}

export default App;