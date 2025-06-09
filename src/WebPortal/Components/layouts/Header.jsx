import React from "react";
import './global.css';
import logo from '../../assets/img/logo1.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';



function Header() {
  return (
    <>
      <div class="home-navbar">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
              <div class="navbar-logo">
                <img src={logo} alt="" />
              </div>
            </div>
            <div class="col-lg-8">
              <div class="nav-content">
                <ul class="nav-ul">
                  <li>
                    <span class="nav-icon">
                      <FontAwesomeIcon icon={faHeadphones} />
                    </span>
                    Help
                  </li>
                  <li>
                    <span class="nav-icon">
                      <i class="fa-solid fa-language"></i>
                    </span>
                    English
                  </li>
                  <li>
                    <span class="nav-icon">
                      <i class="fa-solid fa-user"></i>
                    </span>
                    Account
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
