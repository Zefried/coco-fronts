import { useLocation } from 'react-router-dom';


const AdcBusList = () => {

    const { state: data } = useLocation();


    console.log(data);

    const to12Hour = (timeStr) => {
      const [hour, minute] = timeStr.split(':').map(Number);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hr = hour % 12 || 12;
      return `${hr}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };
    
      return (
        <>
          {data.map((item, index) => {
            const start = JSON.parse(item.route_info.start_point);
            const end = JSON.parse(item.route_info.final_drop_point);
            return (
              <div className="busCards" key={index}>
               
                <div className="busCard bc">
                  
                  <div className="busName">
                    <div className="busWrapper">
                      <div className="busHeading">
                        
                        <p className="basicText">Assam state transport Corporation</p>
                        <span className="basicText">
                          {item.bus_detail.bus_name}{" "}
                          {item.bus_detail.Ac_type ? "A/C" : ""}{" "}
                          {item.bus_detail.sleeper ? "Sleeper" : "Seater"}
                        </span>

                      </div>
                      
                      <div className="rating">
                        <div className="star">
                          <i className="ri-star-fill" />
                          4.5
                        </div>
                        <span className="basicText">241</span>
                      </div>

                      <div className="duration d-flex gap-3">
                        
                        <div className="startTime">
                          <p className="basicText">Start Time</p>
                          <p className="fw-bold basicText">{to12Hour(start.time)}</p>
                          <span className="basicText">{item.route_info.estimated_duration}</span>
                        </div>
                        <div className="stopTime">
                          <p className="basicText">Stop Time</p>
                          <p className="fw-bold basicText">{to12Hour(end.time)}</p>
                          <span className="basicText">
                            {item.seat_config.currently_avl ?? "All"} seats
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

                      <p>
                        <a href="#" className="text-black basicText">Boarding/Dropping Points</a>
                      </p>

                      <p>
                        <a href="#" className="text-black basicText">Bus Photos</a>
                      </p>

                    </div>

                    <div className="seatButton bc">
                      <button id="viewSeat" className="basicText">View Seats</button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </>
      );

};

export default AdcBusList;
