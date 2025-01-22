import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import RoleBasedRoute from "./RoleBasedRoute";
import AdminHomePage from "../pages/AdminHomePage";
import EmployeeHomePage from "../pages/EmployeeHomePage";
import SignUpPage from "../pages/SignUpPage";
import AddingGamePage from "../pages/AddingGamePage";
import SearchGamePage from "../pages/SearchGamePage";
import AuthRoute from "./AuthRoute";
import EditGamePage from "../pages/EditGamePage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route
        path="/admin-home"
        element={
          <AuthRoute>
            <RoleBasedRoute requiredRole="admin">
              <AdminHomePage />
            </RoleBasedRoute>
          </AuthRoute>
        }
      />

      <Route
        path="/employee-home"
        element={
          <AuthRoute>
            <RoleBasedRoute requiredRole="employee">
              <EmployeeHomePage />
            </RoleBasedRoute>
          </AuthRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />

      <Route
        path="/add-games"
        element={
          <AuthRoute>
            <AddingGamePage />
          </AuthRoute>
        }
      />

      <Route
        path="/search-games"
        element={
          <AuthRoute>
            <SearchGamePage />
          </AuthRoute>
        }
      />

      <Route
        path="/edit-game"
        element={
          <AuthRoute>
            <EditGamePage />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
