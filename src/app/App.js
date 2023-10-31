import ElevateAppBar from "./common/ElevateAppBar";
import Demo from "./components/Demo";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import AllCoupons from "./components/AllCoupons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./common/Footer";
import Contact from "./components/Contact";
import Home from "./components/HomePage/Home";
import PrivateRoute from "../utils/PrivateRoute";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import "../assets/styles.css";
import AdminDashboard from "./admin/AdminDashboard";
import ViewAllCoupons from "./admin/ViewAllCoupons";
import ViewAllUsers from "./admin/ViewAllUsers";
import RegisterAdmin from "./admin/RegisterAdmin";
import NotFound404 from "./common/404NotFound";

function App() {
  const { isLoggedIn, roles } = useSelector((state) => state.auth.value);
  const isAdmin = roles.includes("ROLE_ADMIN");
  return (
    <Router>
      <ElevateAppBar />
      <Routes>
        <Route
          path="/"
          element={
            !isAdmin ? (
              <Home />
            ) : isAdmin ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn && !isAdmin ? (
              <Navigate to="/" replace />
            ) : isAdmin ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/userRegister"
          element={
            isLoggedIn ? <Navigate to="/profile" replace /> : <UserRegister />
          }
        />
        <Route
          path="/contact"
          element={
            !isAdmin ? <Contact /> : <Navigate to="/dashboard" replace />
          }
        />
        {/* <PrivateRoute
          path="/browseAllCoupons"
          element={
            <Box sx={{ pb: 8 }}>
              <AllCoupons />
            </Box>
          }
        /> */}
        <Route
          path="/browseAllCoupons"
          element={
            isLoggedIn && !isAdmin ? (
              <Box sx={{ pb: 8 }}>
                <AllCoupons />
              </Box>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/viewAllCoupons"
          element={
            isLoggedIn && isAdmin ? (
              <ViewAllCoupons />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/viewAllUsers"
          element={
            isLoggedIn && isAdmin ? (
              <ViewAllUsers />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/adminRegister"
          element={
            isLoggedIn && isAdmin ? (
              <RegisterAdmin />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/404" element={<NotFound404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
