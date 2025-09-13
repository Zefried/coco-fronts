// ShippingPolicy.js
import React from 'react';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import './Shipping.css';
import MobileBottomNav from '../../Layout/MobileNav/MobileNav';

const ShippingPolicy = () => {
    return (
        <div className="shipping-policy-container">
            <Header />
            
            <div className="shipping-content">
                <div className="shipping-header">
                    <h1 className="shipping-title">Shipping Policy</h1>
                </div>
                
                <div className="shipping-section">
                    <div className="policy-item">
                        <div className="policy-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="18" height="13" rx="2" ry="2"></rect>
                                <polyline points="1 3 10 13 19 3"></polyline>
                            </svg>
                        </div>
                        <div className="policy-text">
                            <h3>Order Processing</h3>
                            <p>Orders are processed within 1–3 business days.</p>
                        </div>
                    </div>
                </div>
                
                <div className="shipping-section">
                    <div className="policy-item">
                        <div className="policy-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div className="policy-text">
                            <h3>Delivery Times</h3>
                            <p>Delivery times vary by location but typically take 3–7 business days within India.</p>
                        </div>
                    </div>
                </div>
                
                <div className="shipping-section">
                    <div className="policy-item">
                        <div className="policy-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <div className="policy-text">
                            <h3>Shipping Charges</h3>
                            <p>Shipping charges, if any, are calculated at checkout.</p>
                        </div>
                    </div>
                </div>
                
                <div className="shipping-section">
                    <div className="policy-item">
                        <div className="policy-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                            </svg>
                        </div>
                        <div className="policy-text">
                            <h3>Delivery Delays</h3>
                            <p>We are not responsible for delays caused by courier partners or natural events.</p>
                        </div>
                    </div>
                </div>
                
                <div className="shipping-section">
                    <div className="policy-item">
                        <div className="policy-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <div className="policy-text">
                            <h3>Order Tracking</h3>
                            <p>Customers can check order status on profile.</p>
                        </div>
                    </div>
                </div>
                
                <div className="shipping-note">
                    <p>If you have any questions about our shipping policy, please feel free to <a href="/contact">contact us</a>.</p>
                </div>
            </div>
            <MobileBottomNav/>
            <Footer />
        </div>
    );
};

export default ShippingPolicy;