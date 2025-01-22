import "../styles/Header.css";
import logo from "../assets/rastar.png";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const role = Cookie.get("userRole");
  const status = Cookie.get("userStatus");
  const lastName = Cookie.get("userLastName");
  const firstName = Cookie.get("userFirstName");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (role === "admin") navigate("/admin-home");
    if (role === "employee") navigate("/employee-home");
  };

  return (
    <div className="header-box">
      <img src={logo} className="rastar-logo" onClick={handleNavigate} />
      <div className="status-container">
        <div className="status-text">Status: {status}</div>
      </div>
      <div className="user-info-box">
        {firstName} {lastName}
      </div>
    </div>
  );
};

export default Header;
