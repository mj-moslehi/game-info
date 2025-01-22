import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/SignInPage.css";

const SignInPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        setError("");
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:2555/user/sign-in", {
                username,
                password,
            });

            const {token, id, role, firstName, lastName, enable} = response.data;

            const expirationTime = 1 / 24;

            Cookies.set("authToken", token, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });

            Cookies.set("userId", id, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });

            Cookies.set("userRole", role, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });
            Cookies.set("userFirstName", firstName, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });
            Cookies.set("userLastName", lastName, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });
            Cookies.set("userStatus", enable, {
                expires: expirationTime,
                secure: true,
                sameSite: "Strict",
            });

            if (role === "admin" && enable) {
                navigate("/admin-home");
            } else if (role === "employee" && enable) {
                navigate("/employee-home");
            } else {
                setError("Your account isn't Active");
            }
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-form">
                <p className="sign-in-title">Sign In</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignIn} className="sign-in-button">
                    Lets Go !!
                </button>
                {error && (
                    <p className="error-message">
                        {typeof error === "object" ? JSON.stringify(error) : error}
                    </p>
                )}
                <p className="sign-up-link">
                    <a href="/sign-up">I don’t have an account</a>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
