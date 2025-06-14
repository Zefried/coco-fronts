import React, { useEffect, useState } from 'react';
import './ViewSeat.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NormalSeat from '../../Seats/Seater/NormalSeat';
import Sleeper from '../../Seats/Sleeper/Sleeper';

const SeatSelection = () => {

  const { state: data } = useLocation();
  const navigate = useNavigate();
  const bus_id = data.bus_id;
  const locations = data.userSearchRoute;

  const [busInfo, setBusInfo] = useState({
    routes: [],
    boarding_points: [],
    dropping_points: [],
    rest_point: '',
    rest_duration: '',
    estimated_duration: '',
  });

  const [busState, setBusState] = useState({ seater: 0, sleeper: 0 });

  const [seatSelected, setSeatSelected] = useState(false);
  
  useEffect(() => {

    const interval = setInterval(() => {
      setSeatSelected(localStorage.getItem('seatSelected') === 'true');
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!bus_id) return;

    const fetchSeatState = async () => {
      const res = await axios.get(`/api/fetch-bus-state/${bus_id}`);
      setBusState({
        seater: res.data.data.seater,
        sleeper: res.data.data.sleeper
      });
    };

    const fetchBusData = async () => {
      try {
        const res = await axios.post('/api/fetch-bus-data', { bus_id });
        const data = res.data[0];
        setBusInfo({
          routes: JSON.parse(data.routes || '[]'),
          boarding_points: JSON.parse(data.boarding_points || '[]'),
          dropping_points: JSON.parse(data.dropping_points || '[]'),
          rest_point: data.rest_point || '',
          rest_duration: data.rest_duration || '',
          estimated_duration: data.estimated_duration || ''
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSeatState();
    fetchBusData();
  }, [bus_id]);

  const handleContinue = () => {
    navigate('/select-points', { state: { bus_id, locations } });
  };


  return (
    <>
      <div className="container py-5 blackText">
        <div className="destinationBar">
          <div className="seatClose"><i className="ri-close-fill" /></div>
          <div><p>{locations.start.location} → {locations.end.location}</p></div>
        </div>

        <div className="contentWrapper">
          <div className="seatDetails scrollX">
            {busState.seater === 1 ? <NormalSeat /> : 'Loading...'}
            {busState.sleeper === 1 ? <Sleeper /> : 'Loading...'}
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
              <p>{busInfo.routes.length ? busInfo.routes.map(r => r.stop).join(' → ') : 'Route not available'}</p>
              <span>Duration : {busInfo.estimated_duration}</span>
            </div>

            <hr />

            <div className="boardingPoint">
              <h5>Boarding Point</h5>
              <span>{locations.start.location}</span>
              <div className="points">
                {busInfo.boarding_points.map((point, i) => (
                  <p key={i}>{point.time} → {point.location}</p>
                ))}
              </div>
            </div>

            <hr />

            <div className="boardingPoint">
              <h5>Dropping Point</h5>
              <span>{locations.end.location}</span>
              <div className="points">
                {busInfo.dropping_points.map((point, i) => (
                  <p key={i}>{point.time} → {point.location}</p>
                ))}
              </div>
            </div>

            <hr />

            <div className="restPoint">
              <h5>Rest Stop</h5>
              <span className="fw-bold">{busInfo.rest_point}</span>
              <div className="points">
                <p>→ <span className="text-danger">{busInfo.rest_duration} hr:min Stop</span></p>
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
                {[{ val: 5, pct: 65 }, { val: 4, pct: 24 }, { val: 3, pct: 6 }, { val: 2, pct: 2 }, { val: 1, pct: 3 }].map(rate => (
                  <div className="rate" key={rate.val}>
                    <div className="point"><p>{rate.val}</p><i className="ri-star-fill" /></div>
                    <progress max={100} value={rate.pct} />
                    <div className="percent">{rate.pct}%</div>
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

      {seatSelected && (
        <div className="selectPoint active">
          <h5 onClick={handleContinue}>Select Boarding & Dropping Points</h5>
        </div>
      )}
                
    </>
  );
};

export default SeatSelection;
