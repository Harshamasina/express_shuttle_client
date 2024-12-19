import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        try{
            if (!validatePassword(userRegister.password)) {
                setErrorMsg("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
                return;
            }

            if (userRegister.password != userRegister.cpassword) {
                setErrorMsg("Passwords does not match");
                return;
            }

            const res = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/users`, userRegister);
            // console.log(res);
            setErrorMsg(`${userRegister.name}, Your account was created successfully!`);
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

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }  catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.error || "Something went wrong. Please try again.");
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
                    {errorMsg && ( <p className="text-danger mt-3">{errorMsg && errorMsg}</p> )}
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