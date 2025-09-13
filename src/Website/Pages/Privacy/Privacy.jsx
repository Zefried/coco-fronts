// PrivacyPolicy.js
import React from 'react';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import './Privacy.css'; // Import the CSS file
import MobileBottomNav from '../../Layout/MobileNav/MobileNav';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <Header />
            
            <div className="privacy-content">
                <h1 className="privacy-title">Privacy Policy – Sunclay</h1>
                <p className="effective-date"><strong>Effective Date:</strong> 31 August 2025</p>
                
                <div className="policy-section">
                    <h2>1. Information We Collect</h2>
                    <ul>
                        <li>Identifiable information such as name, email address, and phone number.</li>
                        <li>Payment-related information, including transaction IDs provided by users.</li>
                        <li>Cookies and tracking information through services such as Google Analytics and Facebook Pixel.</li>
                        <li>Browsing activity, preferences, and other data related to your interactions with our website.</li>
                    </ul>
                </div>
                
                <div className="policy-section">
                    <h2>2. Use of Information</h2>
                    <ul>
                        <li>Processing and verifying transactions.</li>
                        <li>Facilitating order fulfillment and providing customer support.</li>
                        <li>Analyzing website usage and improving services via analytics tools.</li>
                        <li>Sending promotional communications, where applicable.</li>
                    </ul>
                </div>
                
                <div className="policy-section">
                    <h2>3. Disclosure of Information</h2>
                    <ul>
                        <li>To payment processors for transaction verification.</li>
                        <li>To logistics and delivery partners for order fulfillment.</li>
                        <li>To third-party analytics providers for the purpose of improving our services.</li>
                        <li>When required by law or regulatory authorities.</li>
                    </ul>
                </div>
                
                <div className="policy-section">
                    <h2>4. Cookies and Tracking Technologies</h2>
                    <p>We employ cookies and similar tracking technologies to enhance user experience, measure website performance, and analyze marketing campaigns.</p>
                </div>
                
                <div className="policy-section">
                    <h2>5. Data Security</h2>
                    <p>We implement industry-standard measures including encryption, secure servers, and restricted access to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </div>
                
                <div className="policy-section">
                    <h2>6. Children's Privacy</h2>
                    <p>Our services are available to users of all ages. We do not actively verify age, and personal information may be collected without age restriction.</p>
                </div>
                
                <div className="policy-section">
                    <h2>7. Your Rights</h2>
                    <ul>
                        <li>Access, correct, or delete personal information.</li>
                        <li>Opt-out of receiving marketing communications.</li>
                        <li>Exercise any rights available under applicable data protection laws.</li>
                    </ul>
                </div>
                
                <div className="policy-section">
                    <h2>8. Compliance with Indian Law</h2>
                    <p>Sunclay complies with the <strong>Information Technology Act, 2000</strong> and related rules, including the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>. By using our website, you consent to the collection, storage, and processing of your personal information in accordance with this Privacy Policy.</p>
                </div>
                
                <div className="policy-section">
                    <h2>9. Updates to This Policy</h2>
                    <p>We may revise this Privacy Policy from time to time. Updates will be posted on this page with the revised effective date.</p>
                </div>
                
                <div className="policy-section">
                    <h2>10. Contact Information</h2>
                    <p>For any questions regarding this Privacy Policy, please contact us at <strong>8134079208</strong> or [your email].</p>
                </div>
            </div>
            <MobileBottomNav/>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;