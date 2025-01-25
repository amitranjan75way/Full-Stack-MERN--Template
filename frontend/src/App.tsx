import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import RestaurantDetails from "./pages/restaurantDetails";
import AddMenuItem from "./pages/addMenuItem";
import PublicRoute from "./components/auth/PublicRoutes";
import { useAppSelector } from "./store/store";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  const { isAuthenticated, name, role } = useAppSelector((store) => store.auth);
  return (
    <Routes>
      <Route element={<Basic />}>
        {/* <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        {/* </Route> */}

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/restaurant/addItem" element={<AddMenuItem />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;