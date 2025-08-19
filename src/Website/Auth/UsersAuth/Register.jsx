import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const UserRegister = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ''});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        if (form.password !== form.confirmPassword) {
            setErrors({confirmPassword: 'Passwords do not match'});
        
            return;
        }

        try {
            const res = await axios.post('/api/user-register', {
                name: form.name,
                phone: form.phone,
                password: form.password
            });

            if (res.data.status === 422) {
                const transformedErrors = {};
                Object.keys(res.data.errors).forEach(key => {
                    transformedErrors[key] = res.data.errors[key][0];
                });
                setErrors(transformedErrors);
                return; // stop further execution
            }

           if (res.data.status === 201) {
                alert(res.data.message);
                setForm({ name: '', phone: '', password: '', confirmPassword: '' });

                const { token, user } = res.data.autoLogin;
                AuthAction.updateState({
                    isAuthenticated:true,
                    token: token,
                    name: user.name,
                    role: user.role
                });

                navigate('/');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }

    };

    return (
        <div className="UR-container">
            <div className="UR-card">
                <div className="UR-header">
                    <h1>Create Account</h1>
                    <p>Join us today and get started</p>
                </div>
                
                <form onSubmit={handleSubmit} className="UR-form">
                    <div className={`UR-form-group ${form.name ? 'UR-focused' : ''}`}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span className="UR-error">{errors.name}</span>}
                    </div>
                    
                    <div className={`UR-form-group ${form.phone ? 'UR-focused' : ''}`}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <span className="UR-error">{errors.phone}</span>}
                    </div>
                    
                    <div className={`UR-form-group ${form.password ? 'UR-focused' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="UR-error">{errors.password}</span>}
                    </div>
                    
                    <div className={`UR-form-group ${form.confirmPassword ? 'UR-focused' : ''}`}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <span className="UR-error">{errors.confirmPassword}</span>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="UR-btn"
                     
                    >
                        Create Account
                    </button>
                </form>
                
                <div className="UR-footer">
                    <p>Already have an account? <a href="/user-login">Sign In</a></p>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;