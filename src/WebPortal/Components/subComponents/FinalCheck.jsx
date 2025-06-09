import React from "react";

const FinalCheck = ({ setShowPassengerDetails }) => {
  return (
    <div>
      <div className="proceed-section">
        <div className="proceed-section-header">
          <span className="proceed-section-title">Boarding & Dropping</span>
          <a href="#" className="proceed-section-change">
            CHANGE
          </a>
        </div>

        <div className="proceed-section-details">
          <div className="proceed-section-route">
            <div className="proceed-section-location">
              <span className="proceed-section-dot"></span>
              <span className="proceed-section-place">Guwahati: ISBT</span>
              <span className="proceed-section-time">20:30</span>
            </div>
            <div className="proceed-section-info">
              Rupnath Brahma Inter-State Bus Terminal, A Bethkuchi, Near Balaji Temple, AHOM GAON, Guwahati, Assam
            </div>
            <div className="proceed-section-location">
              <span className="proceed-section-dot"></span>
              <span className="proceed-section-place">Dibrugarh</span>
              <span className="proceed-section-time">
                05:30
                <span className="proceed-section-date">(18 MAY)</span>
              </span>
            </div>
            <div className="proceed-section-info">Dibrugarh, Amalapatti</div>
          </div>

          <div className="proceed-section-seat">
            <span className="proceed-section-seat-label">Seat No</span>
            <span className="proceed-section-seat-number">10E</span>
          </div>

          <div className="proceed-section-fare">
            <span className="proceed-section-fare-label">Fare</span>
            <span className="proceed-section-fare-amount">INR 982.48</span>
          </div>

          <div className="proceed-section-tax">
            TAXES WILL BE CALCULATED DURING PAYMENT
          </div>

          <a href="#" className="proceed-section-fare-details">
            SHOW FARE DETAILS
          </a>
        </div>

        <a
          href="#"
          className="proceed-section-button"
          onClick={() => setShowPassengerDetails(prev => !prev)}
        >
          PROCEED TO BOOK
        </a>
      </div>
    </div>
  );
};

export default FinalCheck;
