import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import { useAppSelector } from "./store/store";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  
  return (
    <Routes>
      <Route element={<Basic />}>
        {/* <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        {/* </Route> */}

      </Route>
    </Routes>
  );
}

export default App;