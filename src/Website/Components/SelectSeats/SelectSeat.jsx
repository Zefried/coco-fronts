import React from 'react';
import './SelectSeat.css';
import SeaterUI from '../Seats/Seater/Seater';
import SleeperUI from '../Seats/Sleeper/Sleeper';

// import LoginModal from '../UserAccount/LoginModel';

const SelectSeat = () => {
  const isAuth = true; // remove later; just to show modal if needed
  const locations = { start: { location: 'Start' }, end: { location: 'End' } };

  return (
    <>
      {!isAuth && <LoginModal />}
     
      <div className="container py-5 blackText">
    
        <div className="destinationBar">
          <div className="seatClose"><i className="ri-close-fill" /></div>
          <div><p>{locations.start.location} → {locations.end.location}</p></div>
        </div>

        <div className="contentWrapper">
          <div className="seatDetails scrollX">
            <SeaterUI />
            <SleeperUI />
            <i className="ri-sofa-line" id="seat" />
          </div>

          <div className="boardingDropping blackText">
            <div className="busImg">
              <img src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=900" alt="bus1" className="img-fluid" />
              <img src="https://plus.unsplash.com/premium_photo-1676573201639-79bb6d344ffd?w=900" alt="bus2" className="img-fluid" />
              <img src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=900" alt="bus3" className="img-fluid" />
            </div>

            <div className="routeDetails">
              <h5>Bus Route</h5>
              <p>Route → Stops</p>
              <span>Duration : --:--</span>
            </div>

            <hr />

            <div className="boardingPoint">
              <h5>Boarding Point</h5>
              <span>{locations.start.location}</span>
              <div className="points">
                <p>10:00 → Point A</p>
                <p>10:30 → Point B</p>
              </div>
            </div>

            <hr />

            <div className="boardingPoint">
              <h5>Dropping Point</h5>
              <span>{locations.end.location}</span>
              <div className="points">
                <p>16:00 → Point X</p>
                <p>16:30 → Point Y</p>
              </div>
            </div>

            <hr />

            <div className="restPoint">
              <h5>Rest Stop</h5>
              <span className="fw-bold">XYZ Dhaba</span>
              <div className="points">
                <p>→ <span className="text-danger">0:30 hr:min Stop</span></p>
              </div>

              <p className="mt-3 fw-bold">Travel experience</p>
              <div className="travelExp">
                <h6><i className="ri-thumb-up-fill" />Washroom Hygiene</h6>
                <h6><i className="ri-thumb-up-fill" />Food Quality</h6>
                <h6><i className="ri-thumb-up-fill" />Safety</h6>
              </div>
            </div>

            <hr />

            <div className="amenities">
              <h5>4 amenities</h5>
              <div className="points">
                <p>Blankets</p>
                <p>Charging Point</p>
                <p>Reading Light</p>
                <p>Pillow</p>
              </div>
            </div>

            <hr />

            <div className="ratingReview">
              <div className="d-flex justify-content-between">
                <h5>Ratings & Reviews</h5>
                <div className="rstar">
                  <span><i className="ri-star-fill" />4.4</span>
                  <h6>187 Ratings</h6>
                </div>
              </div>

              <div className="points">
                {[5, 4, 3, 2, 1].map((val, i) => (
                  <div className="rate" key={i}>
                    <div className="point"><p>{val}</p><i className="ri-star-fill" /></div>
                    <progress max={100} value={val * 10} />
                    <div className="percent">{val * 10}%</div>
                  </div>
                ))}
              </div>

              <p className="mt-5 fw-bold">Loved by travelers</p>
              <div className="travelExp">
                <h6><i className="ri-thumb-up-fill" />Staff Behaviour (48)</h6>
                <h6><i className="ri-thumb-up-fill" />Punctuality (47)</h6>
                <h6><i className="ri-thumb-up-fill" />Seat / Sleep Comfort (46)</h6>
                <h6><i className="ri-thumb-up-fill" />Seat / Cleanliness (44)</h6>
                <h6><i className="ri-thumb-up-fill" />Driving (41)</h6>
                <h6><i className="ri-thumb-up-fill" />AC (39)</h6>
                <h6><i className="ri-thumb-up-fill" />Rest stop hygiene (30)</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="selectPoint active">
        <h5>Select Boarding & Dropping Points <span style={{ marginLeft: '10px' }}>₹500</span></h5>
      </div>
    </>
  );
};

export default SelectSeat;
