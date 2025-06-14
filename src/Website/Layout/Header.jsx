import react from 'react';
import '../Home/WebIndex.css';
import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../Home/mainLogo.png';

 const WebHeader = () => {
    
          const [showAccount, setShowAccount] = useState(false);

    return (
        <>
        {/* Header Start */}
          <header>

            <div id="navbar" className=" py-3">
                
                {/* Desktop Nav */}
                <div id="deskTopNav">
                    <nav className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="leftNav d-flex align-items-center">
                        <Link to="#" className="d-flex flex-column justify-content-center align-items-center">
                        <img
                            className="img-fluid mainLogo"
                            src="https://nrbuss.com/assets/logo1-CSrs-mow.png"
                            alt=""
                        />
                        <span className="brandHeading">Where luxury meets safety & comfort</span>
                        </Link>
                    </div>
                    <div className="rightNav d-flex align-items-center">
                        <div className="rightIcons d-flex align-items-center">
                        <i className="ri-menu-4-line"></i>
                        <Link to=""><span>Bookings</span></Link>
                        </div>
                        <div className="rightIcons d-flex align-items-center">
                        <i className="ri-user-line"></i>
                        <Link to=""><span>Profile</span></Link>
                        </div>
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

                {/* Mobile Nav */}
                <div id="mobileNave">
                    <nav className="container-fluid d-flex justify-content-between align-items-center">
                    <Link to="#" className="d-flex flex-column justify-content-start align-items-start">
                        <img className="img-fluid mainLogo" src={logo} alt="" />
                        <span className="brandHeading">Where luxury meets safety & comfort</span>
                    </Link>
                    <div className="mobileMenuLinks">
                        <div className="rightIcons d-flex align-items-center">
                        <i className="ri-menu-5-fill"></i>
                        <Link to=""><span>Bookings</span></Link>
                        </div>
                        <div className="rightIcons d-flex align-items-center">
                        <i className="ri-user-line"></i>
                        <Link to=""><span>Profile</span></Link>
                        </div>
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

                {/* Shared Register/Login */}
                {showAccount && (
                    <div className="userDiv globalUserDiv">
                        <div className="register">
                            <Link to="">
                            <i className="ri-user-add-line" style={{color:'white'}}></i>
                            <span style={{color:'white'}} >Register</span>
                            </Link>
                            <Link to="">
                            <i className="ri-login-circle-line" style={{color:'white'}}></i>
                            <span style={{color:'white'}} >LogIn</span>
                            </Link>
                        </div>
                    </div>
                )}

            </div>

          </header>
          {/* Header End */}
        </>
    )
}


export default WebHeader;