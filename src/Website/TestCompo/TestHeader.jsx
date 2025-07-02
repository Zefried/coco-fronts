import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Components/Home/mainLogo.jpeg';
import { AuthAction } from '../../CustomStateManage/OrgUnits/AuthState';
import './TestHeader.css';

const TestHeader = () => {
    const [showAccount, setShowAccount] = useState(false);
    const isAuthenticated = AuthAction.getState('auth')?.isAuthenticated;
    const navigate = useNavigate();

    const handleBookingsClick = () => {
        if (isAuthenticated) navigate('/bookings');
        else navigate('/login');
    };

    const handleLogOut = () => {
        window.location.reload();
    };

    return (
        <header className="modern-header">
            <div className="header-container">
                {/* Logo Section */}
                <Link to="/" className="logo-wrapper">
                    <img src={logo} alt="Quick & Easy Logo" className="logo-img" />
                    <span className="logo-text">Quick & Easy Bookings</span>
                </Link>

                {/* Navigation Actions */}
                <div className="nav-actions">
                    {/* Bookings Button */}
                    <button className="nav-btn" onClick={handleBookingsClick}>
                        <i className="ri-calendar-line"></i>
                        <span>My Bookings</span>
                    </button>

                    {/* Account Dropdown */}
                    <div 
                        className={`account-dropdown-trigger ${showAccount ? 'active' : ''}`}
                        onClick={() => setShowAccount(!showAccount)}
                    >
                        <i className="ri-user-line"></i>
                        <span>{isAuthenticated ? 'Account' : 'Login'}</span>
                        <i className="ri-arrow-down-s-line dropdown-arrow"></i>
                    </div>

                    {/* Dropdown Menu */}
                    {showAccount && (
                        <div className="account-dropdown">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="dropdown-item">
                                        <i className="ri-login-box-line"></i>
                                        <span>Login</span>
                                    </Link>
                                    <Link to="/register" className="dropdown-item highlight">
                                        <i className="ri-user-add-line"></i>
                                        <span>Sign Up</span>
                                    </Link>
                                </>
                            ) : (
                                <button className="dropdown-item" onClick={handleLogOut}>
                                    <i className="ri-logout-box-r-line"></i>
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TestHeader;