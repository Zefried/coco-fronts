import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="newsletter">
      <p className="newsletter-title">Newsletter</p>
      <p className="newsletter-desc">
        Get yourself connected. Sign up for early access to new collections, stories and surprises.
      </p>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">JOIN</button>
      </form>
    </div>
    <div className="footer-links">
      <h1 className="footer-logo">SunClaY</h1>
      <div className="footer-nav">
        <a href="privacy-policy">PRIVACY</a>
        <a href="privacy-policy">TERMS</a>
        <a href="contact">CONTACT</a>
        <a href="shipping-policy">SHIPPING</a>
        <Link to={{pathname:'/admin-login'}}>ADMIN LOGIN</Link>
      </div>
      <p className="footer-copy">© Sunclay 2025</p>
    </div>
  </footer>
);

export default Footer;
