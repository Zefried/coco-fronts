import React, { useEffect, useState } from 'react';
import './PassengerInfo.css';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import { useNavigate } from 'react-router-dom';

const PassengerInfo = () => {
  let navigate = useNavigate();
  const { parent_route, date_of_journey, operator_id, userId, origin, destination } = AuthAction.getState('auth');

  const [whatsapp, setWhatsapp] = useState('');
  const [psgData, setPsgData] = useState([]);
  const [psgField, setPsgField] = useState([]);
  const [fareMap, setFareMap] = useState({});
  const [totalFare, setTotalFare] = useState(0);

  const handleChange = (index, field, value) => {
    const newData = [...psgData];
    newData[index] = { ...newData[index], [field]: value };
    setPsgData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ whatsapp, psgData });
    await storePNR();
  };

  const fetchSeatHoldInfo = async () => {
    try {
      const payload = {
        user_id: userId,
        parent_route: parent_route,
        operator_id: operator_id,
        date: date_of_journey,
        source: origin,
        destination: destination,
      };

      const res = await axios.post('/api/get-user-seat-holdings', payload);
      const [fareList, seats] = res.data.data || [[], []];

      const fareMapObj = {};
      fareList.forEach(f => {
        fareMapObj[f.type] = parseFloat(f.final_fare);
      });

      setFareMap(fareMapObj);
      setPsgField(seats);
      setPsgData(seats.map(() => ({ name: '', gender: '' })));

      const total = seats.reduce((sum, s) => sum + (fareMapObj[s.seat_type] || 0), 0);
      setTotalFare(total);
      AuthAction.updateState({totalFare:total});

    } catch (err) {
      console.error("Seat hold fetch failed", err);
    }
  };

  const storePNR = async () => {
    try {
      const details = psgData.map((psg, i) => ({
        name: psg.name,
        gender: psg.gender,
        seat_no: psgField[i]?.seat_no,
        seat_type: psgField[i]?.seat_type
      }));

      const payload = {
        type: "store",
        user_id: userId,
        operator_id: operator_id,
        parent_route: parent_route,
        date: date_of_journey,
        details: details
      };

      const res = await axios.post('/api/pnr', payload);
      if(res.data.status == 200){
        navigate('/payment-info')
      } else{
        alert('session expired! please book again')
        navigate('/');
      }
      console.log("PNR stored successfully", res.data);
    } catch (err) {
      console.error("PNR store failed", err);
    }
  };

  useEffect(() => {
    fetchSeatHoldInfo();
  }, []);

  return (
    <div className="container py-5">
      <div className="destinationBar mb-4">
        <div className="closeIcon"><i className="ri-close-fill" /></div>
        <div><p>{origin} -&gt; {destination}</p></div>
      </div>

      <div className="contactWrapper">
        <h3>Please Fill The Form</h3>
        <form className="contact-form-wrapper" onSubmit={handleSubmit}>
          {psgField.map((psg, index) => (
            <div key={index} className="psg-form mt-5">
              <h2>Passenger Details</h2>
              <p><i className="ri-account-circle-fill" /> Passenger {index + 1}</p>
              <span>Seat {psg.seat_no}, {psg.seat_type} - ₹{fareMap[psg.seat_type]}</span>

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
                    value="female"
                    checked={psgData[index]?.gender === 'female'}
                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                  />
                  Female
                </label>
              </div>
            </div>
          ))}

          <div className="totalFareBox mt-4">
            <h4>Total Fare: ₹{totalFare}</h4>
          </div>

          <button type="submit" className="submit-btn mt-5">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PassengerInfo;
