import React, { useEffect, useState } from 'react';
import './PsgInfo.css';
import axios from 'axios';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';
import { useNavigate } from 'react-router-dom';

const PsgInfo = () => {
  const navigate = useNavigate();
  const { busId, origin, destination, userId } = AuthAction.getState('auth') || {};
  const [busInfo, setBusInfo] = useState(null);
  const [psgField, setPsgFields] = useState([]);
  const [psgData, setPsgData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.post('/api/fetch-bus-data', {
        bus_id: busId,
        origin,
        destination,
      });
      const data = res.data[0];
      data.routes = JSON.parse(data.routes);
      data.boarding_points = JSON.parse(data.boarding_points);
      data.dropping_points = JSON.parse(data.dropping_points);
      setBusInfo(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const fetchPsgFields = async () => {
    try {
      const res = await axios.post('/api/fetch-psg-fields', {
        bus_id: busId,
        origin,
        destination,
        user_id: userId,
      });

      if (res.data.status === 200 && res.data.data.length > 0) {
        setPsgFields(res.data.data);
        setPsgData(res.data.data.map((psg) => ({
          seat_no: psg.seat_no,
          seat_type: psg.seat_type,
          name: '',
          gender: ''
        })));
      } else {
        alert("Oops, looks like your session has expired. Please try again.");
        navigate('/home');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPsgFields();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...psgData];
    updated[index][field] = value;
    setPsgData(updated);
  };

  const handleSubmit = () => {
    console.log(psgData);
  };

  return (
    <div className="container py-5">
      <div className="destinationBar mb-4">
        <div className="closeIcon"><i className="ri-close-fill" /></div>
        <div><p>{origin} -&gt; {destination}</p></div>
      </div>

      <div className="contactWrapper">
        <form className="contact-form mb-5">
          <h2>Contact Details</h2>
          <span>Ticket details will be sent to</span>
          <input type="tel" required placeholder="Enter WhatsApp number" />
        </form>

        {psgField.map((psg, index) => (
            <form key={index} className="psg-form mt-5">
                <h2>Passenger Details</h2>
                <p><i className="ri-account-circle-fill" /> Passenger {index + 1}</p>
                <span>Seat {psg.seat_no}, {psg.seat_type}</span>

                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={psgData[index]?.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                />

                <div className="psg-gender-group">
                    <label>
                    <input
                        type="radio"
                        name={`gender-${index}`}
                        value="male"
                        checked={psgData[index]?.gender === 'male'}
                        onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    />
                    Male
                    </label>
                    <label>
                    <input
                        type="radio"
                        name={`gender-${index}`}
                        value="Female"
                        checked={psgData[index]?.gender === 'female'}
                        onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    />
                    Female
                    </label>
                </div>
            </form>
        ))}

        <button type="button" onClick={handleSubmit} className="submit-btn mt-5">Submit</button>
      </div>

      {busInfo && (
        <div className="infoWrapper py-4">
    

          <div className="mb-4">
            <h4>Boarding Points</h4>
            <ul>
              {busInfo.boarding_points.map((pt, i) => (
                <li key={i}>{pt.time} - {pt.location}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4>Dropping Points</h4>
            <ul>
              {busInfo.dropping_points.map((pt, i) => (
                <li key={i}>{pt.time} - {pt.location}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <p><strong>Rest Point:</strong> {busInfo.rest_point} ({busInfo.rest_duration} hrs)</p>
            <p><strong>Estimated Duration:</strong> {busInfo.estimated_duration} hrs</p>
          </div>

          <div className="price-section mb-5">
            <span className="badge bg-success me-3">Sleeper: ₹{busInfo.sleeper_offer_price}</span>
            <span className="badge bg-primary">Seater: ₹{busInfo.seater_offer_price}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsgInfo;
