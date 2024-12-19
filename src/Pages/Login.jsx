import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [ errorMsg, setErrorMsg ] = useState("");
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setUserLogin({
              ...userLogin,
            });
          } else {
            setUserLogin({ ...userLogin, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login_container">
            <div className="form_container">
                <h3>Log In</h3>
                <form onSubmit={handleSubmit} className="user_form">
                    <label>email</label>
                    <input type="text" placeholder="Enter your email" name='email' value={userLogin.email} onChange={handleInputs} required />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name='password' value={userLogin.password} onChange={handleInputs} required />

                    <button type="submit" className="signup-btn">Log In into your Account</button>

                    <p>
                        Don't have an account? <Link className="login_link" to="/register">Sign Up</Link>
                    </p>
                </form>
                <button className="google-btn">Sign in with Google <FaGoogle /></button>
            </div>

            <div className="image-container_1"></div>
        </div>
    )
};

export default Login;