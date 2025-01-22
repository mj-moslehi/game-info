import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import Header from "../components/Header";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    dateOfSignUp: "",
    role: "",
  });
  const [updateStatus, setUpdateStatus] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = Cookies.get("authToken");
  const id = Cookies.get("userId");

  const fetchUserInfo = async () => {
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        "https://api.rastar.sbs/user/find-by-id",
        { id: id, authorization: token }
      );
      const userData = response.data;
      setUserInfo({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        username: userData.username || "",
        role: userData.role || "",
        dateOfSignUp: userData.dateOfSignUp || "",
      });
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");
    try {
      const response = await axios.put("https://api.rastar.sbs/user/update", {
        id: id,
        authorization: token,
        updateReq: userInfo,
      });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  const handleInputChange = (e) => {
    setMessage("");
    setError("");
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUpdateStatus(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-main">
        <div className="box-profile">
          <div className="field-title">First Name :</div>
          <textarea
            className="field-update"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="box-profile">
          <div className="field-title">Last Name :</div>
          <textarea
            className="field-update"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="box-profile">
          <div className="field-title">Username :</div>
          <textarea
            className="field-update"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="box-profile">
          <div className="field-title">Password :</div>
          <textarea
            className="field-update"
            name="password"
            placeholder="you can enter new password"
            value={userInfo.password}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="box-profile">
          <div className="field-title">Role :</div>
          <div className="field-update two">
            <p className="user-info">{userInfo.role}</p>
          </div>
        </div>
        <div className="box-profile">
          <div className="field-title">Data Of Sign Up :</div>
          <div className="field-update two">
            <p className="user-info">{userInfo.dateOfSignUp}</p>
          </div>
        </div>

        <button
          className="update-user"
          disabled={updateStatus}
          onClick={handleUpdate}
        >
          Update
        </button>

        {error && (
          <div className="error-message">
            <p>{typeof error === "object" ? JSON.stringify(error) : error}</p>
          </div>
        )}
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
