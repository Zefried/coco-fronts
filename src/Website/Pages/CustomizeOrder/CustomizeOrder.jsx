import React, { useState } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import MobileBottomNav from "../../Layout/MobileNav/MobileNav";
import './customizeOrder.css';

const CustomOrder = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comment: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="custom-order-container">
      <Header/>
      
      <div className="custom-order-content">
        <div className="custom-order-intro">
          <h1 className="custom-order-title">Custom Pottery Orders</h1>
          <div className="custom-order-description">
            <p>
              Create a one-of-a-kind pottery piece that reflects your unique vision. 
              I'd be happy to collaborate with you to bring your creative ideas to life.
            </p>
            <p>
              Whether you're looking for a special gift or need bulk orders (minimum 6 pieces), 
              I can craft handmade pottery tailored to your needs.
            </p>
            <p>
              Please note that due to the nature of handmade pottery, custom orders require time. 
              Allow a minimum of 21 days for completion, with additional time for more detailed pieces.
            </p>
            <p>
              Let's start a conversation! Share your contact details and vision below, 
              and I'll personally reach out to discuss your custom pottery project.
            </p>
          </div>
        </div>
        
        <div className="custom-order-form-container">
          <div className="form-section">
            <form
              className="custom-order-form"
              action="https://formspree.io/f/xeolblqk"
              method="POST"
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 "
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Your Vision</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your custom pottery idea..."
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Send Request
              </button>
            </form>
          </div>
          
          <div className="image-section">
            <div className="custom-order-image">
              <div className="image-placeholder">
                <div className="placeholder-icon">🏺</div>
                <p>Handmade Pottery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
      <MobileBottomNav/>
    </div>
  );
};

export default CustomOrder;