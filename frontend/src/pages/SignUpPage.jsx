import {useState} from "react";
import axios from "axios";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e) => {
        setError("");
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2555/user/create", {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            });

            if (response.status === 201) {
                setSuccess(true);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="sign-up-container">
            <div className="form-background">
                <form className="sign-up-form" onSubmit={handleSignUp}>
                    <p className="sign-up-title">Sign Up</p>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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
                    </div>
                    <button type="submit" className="sign-up-button">
                        create !
                    </button>
                    {error && (
                        <p className="error-message">
                            {typeof error === "object" ? JSON.stringify(error) : error}
                        </p>
                    )}
                    {success && (
                        <p className="success-message">Account created successfully!</p>
                    )}
                    <p className="sign-in-link">
                        <a href="/">sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
