import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ViewSeat from "../ViewSeat"; // ✅ Import your ViewSeat popup

function BusContent() {
  const location = useLocation();
  const { from, to, date } = location.state || {};

  const [showSeatPopup, setShowSeatPopup] = useState(false);

  const openSeatPopup = () => {
    setShowSeatPopup(true);
  };

  const closeSeatPopup = () => {
    setShowSeatPopup(false);
  };

  return (
    <>
      <div className="bus-head-text">
        <p>
          Showing <strong>39 buses</strong> from <strong>{from}</strong> to{" "}
          <strong>{to}</strong>
        </p>
      </div>

      <div className="bus-cards">
        <div className="row">
          <div class="col-lg-4">
            <div class="bus-name">
              <p>
                <strong>Chartered Bus - ASTC</strong>
              </p>
              <p>Volvo Multi-Axle I-Shift B11R Semi Sleeper (2+2)</p>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="bus-start">
              <h5>21:00</h5>
              <p>{from}</p>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="total-hour">
              <p>8h 30m</p>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="bus-end">
              <h5>05:30</h5>
              <p>{to}</p>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="bus-rating">
              <div class="icon">
                <i class="fa-solid fa-star"></i>
              </div>
              <p>4.6</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bus-price">
              <p>
                Starts from INR <span>982.48</span>
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bus-seats">
              <p>47 Seats available</p>
              <p>19 Window</p>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="bus-links">
              <ul>
                <li>
                  <a href="#" onClick={openSeatPopup}>Bus photos</a>
                </li>
                <li>
                  <a href="#" onClick={openSeatPopup}>Boarding & Dropping Points</a>
                </li>
                <li>
                  <a href="#" onClick={openSeatPopup}>Reviews</a>
                </li>
                <li>
                  <a href="#" onClick={openSeatPopup}>Booking Policies</a>
                </li>
              </ul>
              <div className="view-seat">
                <button onClick={openSeatPopup}>VIEW SEATS</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSeatPopup && (
        <ViewSeat from={from} to={to} date={date} onClose={closeSeatPopup} />
      )}
    </>
  );
}

export default BusContent;
