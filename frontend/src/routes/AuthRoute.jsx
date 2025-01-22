import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const RoleBasedRoute = ({ children }) => {
  const token = Cookies.get("authToken");
  if (!token) return <Navigate to="/" />;

  return children;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RoleBasedRoute;
