import React from "react";

const PassengerDetails = () => {
  return (
    <div>
      <div className="passenger-details">
        <h2>Passenger Details</h2>

        <div className="passenger-info">
          <h3>Passenger Information</h3>
          <div className="form-group">
            <label htmlFor="passenger-name">Passenger 1 | Seat 10E</label>
            <input
              type="text"
              id="passenger-name"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passenger-age">Age</label>
            <input
              type="number"
              id="passenger-age"
              placeholder="Age"
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="gender-group">
              <label>
                <input type="radio" name="gender" value="male" required />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" />
                Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="state">State of Residence *</label>
            <input
              type="text"
              id="state"
              placeholder="State of Residence"
              required
            />
          </div>
        </div>

        <div className="contact-details">
          <h3>Contact Details</h3>
          <div className="info-box">Your ticket will be sent to these details</div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input type="email" id="email" placeholder="Email ID" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select style={{ width: "100px" }}>
                <option value="+91">+91</option>
              </select>
              <input type="tel" id="phone" placeholder="Phone" required />
            </div>
          </div>
        </div>

        <div className="gst-checkbox">
          <input type="checkbox" id="gst" />
          <label htmlFor="gst">I have a GST number (optional)?</label>
        </div>

        <div className="gst-checkbox">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            By clicking on proceed, I agree that I have read and understood the{" "}
            <a href="#">T&Cs</a> and the <a href="#">Privacy Policy</a>
          </label>
        </div>

        <div className="total-amount">
          Total Amount: INR 982.48 (Exclusive of Taxes)
        </div>

        <button className="proceed-btn">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
