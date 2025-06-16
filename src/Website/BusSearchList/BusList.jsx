import React from 'react';
import WebHeader from '../Layout/Header';
import './BusListStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';

const BusList = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  const to12Hour = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hr = hour % 12 || 12;
    return `${hr}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleNavigate = (bus_id, userSearchRoute) => {
    AuthAction.updateState({ busId: bus_id, userRoute: userSearchRoute });
    const updatedState = AuthAction.getState('auth');
    if (updatedState.busId === bus_id) {
      navigate('/view-seats', { state: { bus_id, userSearchRoute } });
    } else {
      alert('Please try again to select a bus.');
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
                <p className="basicText">
                  {JSON.parse(data[0].route_info.start_point)[0]?.location} →
                  {JSON.parse(data[0].route_info.final_drop_point)[0]?.location}
                </p>
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
              {data.map((item, index) => {
                const start = JSON.parse(item.route_info.start_point)[0];
                const end = JSON.parse(item.route_info.final_drop_point)[0];
                const userSearchRoute = { start, end };

                return (
                  <div key={index}>
                    <div className="busCard bc" onClick={() => handleNavigate(item.bus_id, userSearchRoute)}>
                      <div className="busName">
                        <div className="busWrapper">
                          <div className="busHeading">
                            <p className="basicText">Assam State Transport Corporation</p>
                            <span className="basicText">
                              {item.bus_detail.bus_name}{" "}
                              {item.bus_detail.Ac_type ? "A/C" : ""}{" "}
                              {item.bus_detail.sleeper ? "Sleeper" : "Seater"}
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
                              <p className="fw-bold basicText">{to12Hour(start?.time)}</p>
                              <span className="basicText">{item.route_info.estimated_duration}</span>
                            </div>
                            <div className="stopTime">
                              <p className="basicText">Stop Time</p>
                              <p className="fw-bold basicText">{to12Hour(end?.time)}</p>
                              <span className="basicText">
                                {item.seat_config?.currently_avl ?? "All"} seats
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="price">
                          <p className="fw-bold basicText">₹ {item.route_info.seater_offer_price}</p>
                          <span className="basicText">Onwards</span>
                        </div>
                      </div>

                      <div className="busPhoto mt-5">
                        <div className="bdpoints d-flex gap-3">
                          <p><a href="#" className="text-black basicText">Boarding/Dropping Points</a></p>
                          <p><a href="#" className="text-black basicText">Bus Photos</a></p>
                        </div>
                        <div className="seatButton bc">
                          <button id="viewSeat" className="basicText">View Seats</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusList;
