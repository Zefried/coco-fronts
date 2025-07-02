import React from 'react';
import WebHeader from '../../Layout/Header';
import './BusSearchResult.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import axios from 'axios';

const BusSearchResult = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  const to12Hour = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hr = hour % 12 || 12;
    return `${hr}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const toDuration = (min) => `${Math.floor(min / 60)}h ${min % 60}m`;

  const generateLayout = async (operator_id) => {
      const {date_of_journey, parent_route} = AuthAction.getState('auth');
      let payload = {
        type:'generate',
        operator_id:operator_id,
        date:date_of_journey,
        parent_route:parent_route,
      }
     
      return await axios.post('/api/generate-layout', payload)
      
  }

  const handleNavigate = async (index) => {
    
    let operator_id = data[index]?.operator_id;
    const res = await generateLayout(operator_id);
    AuthAction.updateState({operator_id:operator_id});
    
    if (res.data.status == 200) {
      navigate('/select-seat');
    }
  };

  return (
    <>
      <WebHeader />
      <div className="searchBussection">
        <div className="locationText">
          <div className="container">
            {data.length > 0 ? (
              <>
                <p className="basicText">Bus Search Result</p>
                <span className="basicText">{data.length} buses</span>
              </>
            ) : (
              <p className="basicText">No buses found</p>
            )}
          </div>
        </div>

        <div className="container">
          <div className="filterWrapper">
            <div className="filterBus">
              <h4 className="basicText">Filter buses</h4>
              <hr />
              <div className="buttons">
                <button>Seater</button>
                <button>Sleeper</button>
                <button>AC</button>
                <button>Non AC</button>
              </div>
            </div>

            <div className="busCards">
              {data.map((item, index) => (
                <div key={index}>
                  <div className="busCard bc" onClick={() => handleNavigate(index)}>
                    <div className="busName">
                      <div className="busWrapper">
                        <div className="busHeading">
                          <p className="basicText">Operator</p>
                          <span className="basicText">
                            {item.bus_name} {item.ac_status ? 'A/C' : 'Non A/C'} Seater
                          </span>
                        </div>

                        <div className="rating">
                          <div className="star">
                            <i className="ri-star-fill" style={{ color: 'white' }} /> 4.5
                          </div>
                          <span className="basicText">241</span>
                        </div>

                        <div className="duration d-flex gap-3">
                          <div className="startTime">
                            <p className="basicText">Start Time</p>
                            <p className="fw-bold basicText">{to12Hour(item.boarding_time)}</p>
                            <span className="basicText">{toDuration(item.estimated_duration)}</span>
                          </div>
                          <div className="stopTime">
                            <p className="basicText">Stop Time</p>
                            <p className="fw-bold basicText">{to12Hour(item.dropping_time)}</p>
                            <span className="basicText">Available</span>
                          </div>
                        </div>
                      </div>

                     <div className="price" >

                        <p className="fw-bold basicText">₹ {item.fare.final}</p>
                        <span
                          className="basicText mob-text"
                        >
                          Original: ₹ {item.fare.actual}
                        </span>
                      </div>
                    </div>

                    <div className="busPhoto mt-5">
                      <div className="bdpoints d-flex gap-3">
                        <p><a href="#" className="text-black basicText">Boarding/Dropping</a></p>
                        <p><a href="#" className="text-black basicText">Bus Photos</a></p>
                      </div>
                      <div className="seatButton bc">
                        <button id="viewSeat" className="basicText">View Seats</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusSearchResult;
