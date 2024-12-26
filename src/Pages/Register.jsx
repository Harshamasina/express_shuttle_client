import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from "../Config/Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
    const [userRegister, setUserRegister] = useState({
        name: "",
        dob: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        address: "",
        user_type: "",
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUserRegister({ ...userRegister, [name]: value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
    
        try {
            if (!validatePassword(userRegister.password)) {
                setErrorMsg("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
                return;
            }
    
            if (userRegister.password !== userRegister.cpassword) {
                setErrorMsg("Passwords do not match.");
                return;
            }
    
            const userCredential = await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: userRegister.name,
                phoneNumber: userRegister.phone
            });
    
            await sendEmailVerification(user);
    
            setSuccessMsg(`A verification email has been sent to ${userRegister.email}. Please verify your email to continue.`);

            const checkEmailVerification = setInterval(async () => {
                await user.reload();
                if (user.emailVerified) {
                    clearInterval(checkEmailVerification);

                    const userData = {
                        name: userRegister.name,
                        dob: userRegister.dob,
                        email: userRegister.email,
                        password: userRegister.password,
                        phone: userRegister.phone,
                        address: userRegister.address,
                        user_type: userRegister.user_type,
                        firebase_uid: user.uid,
                    };
    
                    try {
                        await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/users`, userData);
                        setSuccessMsg("Your account has been successfully created! Redirecting to login...");
                    } catch (apiError) {
                        setErrorMsg(apiError.response?.data?.error || "Failed to store user details. Please try again.");
                        return;
                    }

                    setUserRegister({
                        name: "",
                        dob: "",
                        email: "",
                        phone: "",
                        password: "",
                        cpassword: "",
                        address: "",
                        user_type: "",
                    });
                    setTimeout(() => navigate("/login"), 2000);
                }
            }, 3000);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            switch (errorCode) {
                case "auth/email-already-in-use":
                    setErrorMsg("The email address is already in use by another account.");
                    break;
                case "auth/invalid-email":
                    setErrorMsg("The email address is not valid.");
                    break;
                case "auth/weak-password":
                    setErrorMsg("The password is too weak.");
                    break;
                default:
                    setErrorMsg(errorMessage || "Something went wrong. Please try again.");
            }
        }
    };    

    return (
        <div className="login_container">
            <div className="form_container">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit} className="user_form">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your Name" name='name' value={userRegister.name} onChange={handleInputs} required />

                    <label>Date of Birth</label>
                    <input type="date" placeholder="Enter your Date of Birth" name='dob' value={userRegister.dob} onChange={handleInputs} required />

                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" name='email' value={userRegister.email} onChange={handleInputs} required />

                    <label>Phone</label>
                    <input type="tel" placeholder="Enter your Phone Number" name='phone' value={userRegister.phone} onChange={handleInputs} required />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name='password' value={userRegister.password} onChange={handleInputs} required />

                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your Password" name='cpassword' value={userRegister.cpassword} onChange={handleInputs} required />

                    <label>Address</label>
                    <input type="text" placeholder="Enter your Address" name='address' value={userRegister.address} onChange={handleInputs} required />

                    <label>Select one Category</label>
                    <select type="text" name='user_type' value={userRegister.user_type} onChange={handleInputs} required>
                        <option disabled value="">Select One Category</option>
                        <option value="S">Student</option>
                        <option value="V">Veteran</option>
                        <option value="SC">Senior Citizen</option>
                        <option value="O">Other</option>
                    </select>

                    <div className="terms">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">I agree to the terms & policy</label>
                    </div>

                    {errorMsg && <p className="text-danger mt-3">{errorMsg}</p>}
                    {successMsg && <p className="text-success mt-3">{successMsg}</p>}
                    
                    <button type='submit' className="signup-btn">Register your Account</button>

                    <p>
                        Already a user? <Link className="login_link" to="/login">Login</Link>
                    </p>
                </form>
            </div>

            <div className="image-container"></div>
        </div>
    )
};

export default Register;