import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const userRole = Cookies.get("userRole");

  if (userRole !== requiredRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin-home" />;
    } else if (userRole === "employee") {
      return <Navigate to="/employee-home" />;
    }
  }

  return children;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};
export default RoleBasedRoute;
