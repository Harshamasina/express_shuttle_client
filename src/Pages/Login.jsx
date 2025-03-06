import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../Config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import axios from "axios";

const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            const user = userCredential.user;

            if (user.emailVerified) {
                setSuccessMsg("Login successful! Redirecting...");
                navigate("/home");
                window.location.reload();
            } else {
                setErrorMsg("Please verify your email before logging in.");
            }
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            switch (errorCode) {
                case "auth/user-not-found":
                    setErrorMsg("No user found with this email. Please register.");
                    break;
                case "auth/wrong-password":
                    setErrorMsg("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setErrorMsg("The email address is not valid.");
                    break;
                case "auth/too-many-requests":
                    setErrorMsg("Too many unsuccessful login attempts. Please try again later.");
                    break;
                default:
                    setErrorMsg("Something went wrong. Please try again.");
            }
        }
    };

    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_uids`);
            const validUids = response.data;
            console.log("Valid UIDs from backend:", validUids);
    
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google Sign-In User UID:", user.uid);
    
            if (validUids.includes(user.uid)) {
                setSuccessMsg("Google Sign-In successful! Redirecting...");
                navigate("/home");
                window.location.reload();
            } else {
                setErrorMsg("Register your account first.");
                setTimeout(() => navigate("/register"), 2000);
            }
        } catch (error) {
            if (error.response) {
                console.error("Backend Error:", error.response.data);
                setErrorMsg("Failed to verify user with backend. Please try again.");
            } else if (error.request) {
                console.error("Network Error:", error.request);
                setErrorMsg("Network error. Please check your connection and try again.");
            } else {
                console.error("Error:", error.message);
                setErrorMsg("Google Sign-In failed. Please try again.");
            }
        }
    };

    return (
        <div className="login_container">
            <div className="form_container">
                <h3>Log In</h3>
                <form onSubmit={handleSubmit} className="user_form">
                    <label>Email</label>
                    <input type="text" placeholder="Enter your email" name='email' value={userLogin.email} onChange={handleInputs} required />

                    <label>Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" name='password' value={userLogin.password} onChange={handleInputs} required />

                    <div className="show_password">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            id="showPass"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPass">Show Password</label>
                    </div>
                    {errorMsg && <p className="text-danger mt-3">{errorMsg}</p>}
                    {successMsg && <p className="text-success mt-3">{successMsg}</p>}

                    <button type="submit" className="signup-btn">Log In into your Account</button>

                    <p>
                        Don't have an account? <Link className="login_link" to="/register">Sign Up</Link>
                    </p>
                </form>

                <button className="google-btn" onClick={signInGoogle}>Sign in with Google <FaGoogle /></button>
            </div>

            <div className="image-container_1"></div>
        </div>
    );
};

export default Login;
