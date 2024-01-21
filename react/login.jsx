import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const [name, value] = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePasswordStrength = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(userData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Invalid email format.",
            }));
            return;
        }

        if (!validatePasswordStrength(userData.password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password must be at least 6 characters long.",
            }));
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/login",{
                    method: {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        
                    }
                } );
            if(response.status === 200){
                setFormData({
                    email: "",
                    password: "",
                });
                navigate("/");
            } else {
                console.log('Login failed.');
    
            }
            
        }  catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className={`form-control ${
                            errors.email ? "is-invalid" : ""
                        }`}
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p className="invalid-feedback">{errors.email}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className={`form-control ${
                            errors.password ? "is-invalid" : ""
                        }`}
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <p className="invalid-feedback">{errors.password}</p>
                </div>
                <button className="btn btn-primary">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};