// UserLogin.jsx
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import { Link, useNavigate } from 'react-router-dom';


const UserLogin = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPhone(e.target.value);
        if (error) setError('');
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic phone number validation
        if (!phone) {
            setError('Please enter your phone number');
            return;
        }
        
        if (phone.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const res = await axios.post('/api/user-login', { phone });

            if(res.data.status === 404){
                alert('User not found. Please register first.');
                navigate('/user-register');
            }

            if(res.data.status === 200){
                const{token, user} = res.data.data;
                AuthAction.updateState({
                    ...AuthAction.getState('sunState'), // keep existing state
                    isAuthenticated: true,
                    token: token,
                    role: user.role,
                    name: user.name
                });
                navigate('/')
            }



        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Enter your phone number to continue</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className={`form-group ${isFocused || phone ? 'focused' : ''}`}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button 
                        type="submit" 
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="btn-spinner"></span>
                        ) : (
                            'One Click Login'
                        )}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/user-register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;