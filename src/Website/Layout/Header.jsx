import React, { useState } from 'react';
import '../Components/Home/WebIndex.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Components/Home/mainLogo.jpeg';
import { AuthAction } from '../../CustomStateManage/OrgUnits/AuthState';

const WebHeader = () => {
    
    const [showAccount, setShowAccount] = useState(false);
    const isAuthenticated = AuthAction.getState('auth')?.isAuthenticated;
    const navigate = useNavigate();

    const handleBookingsClick = () => {
        if (isAuthenticated) navigate('/bookings');
        else navigate('/login');
    };

    const handleLogOut = () => {
        window.location.reload();
    }

    return (
        <>
            <header>
                <div id="navbar" className="py-3">
                    <div id="deskTopNav">
                        <nav className="container-fluid d-flex justify-content-between align-items-center">
                            <div className="leftNav d-flex align-items-center">
                                <Link to="#" className="d-flex flex-column justify-content-center align-items-center">
                                    <img
                                        src={logo}
                                        style={{ height:'50px' }}
                                    />
                                    <span className="brandHeading">Quick & Easy Online Booking</span>
                                </Link>
                            </div>
                            <div className="rightNav d-flex align-items-center">
                                <div className="rightIcons d-flex align-items-center">
                                    <i className="ri-menu-4-line"></i>
                                    <span onClick={handleBookingsClick} style={{ cursor: 'pointer' }}>Bookings</span>
                                </div>
                                {/* <div className="rightIcons d-flex align-items-center">
                                    <i className="ri-user-line"></i>
                                    <Link to="#"><span>Profile</span></Link>
                                </div> */}
                                <div
                                    id="acco"
                                    className="rightIcons ac d-flex align-items-center"
                                    onClick={() => setShowAccount(!showAccount)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="ri-account-circle-line"></i>
                                    <span>Account</span>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div id="mobileNave">
                        <nav className="container-fluid d-flex justify-content-between align-items-center">
                            <Link to="#" className="d-flex flex-column justify-content-start align-items-start">
                                <img className="img-fluid mainLogo" src={logo} alt="" />
                                <span className="brandHeading">Quick & Easy Online Booking</span>
                            </Link>
                            <div className="mobileMenuLinks">
                                <div className="rightIcons d-flex align-items-center">
                                    <i className="ri-menu-5-fill"></i>
                                    <span onClick={handleBookingsClick} style={{ cursor: 'pointer' }}>Bookings</span>
                                </div>
                                {/* <div className="rightIcons d-flex align-items-center">
                                    <i className="ri-user-line"></i>
                                    <Link to="#"><span>Profile</span></Link>
                                </div> */}
                                <div
                                    id="acco2"
                                    className="rightIcons ac d-flex align-items-center"
                                    onClick={() => setShowAccount(!showAccount)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="ri-account-circle-line"></i>
                                    <span>Account</span>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {showAccount && (
                        <div className="userDiv globalUserDiv">
                            <div className="register">
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/register">
                                            <i className="ri-user-add-line" style={{ color: 'white' }}></i>
                                            <span style={{ color: 'white' }}>Register</span>
                                        </Link>
                                        <Link to="/login">
                                            <i className="ri-login-circle-line" style={{ color: 'white' }}></i>
                                            <span style={{ color: 'white' }}>LogIn</span>
                                        </Link>
                                    </>
                                ) : (
                                    <Link to="">
                                        <i className="ri-logout-circle-r-line" style={{ color: 'white' }}></i>
                                        <span onClick={()=>handleLogOut()} style={{ color: 'white' }}>LogOut</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default WebHeader;
