import React, { useEffect, useState } from 'react';
import './SelectSeat.css';
import SeaterUI from '../Seats/Seater/Seater';
import SleeperUI from '../Seats/Sleeper/Sleeper';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import LoginModal from '../UserAccount/LoginModel';
import { useNavigate } from 'react-router-dom';
import nrbus from '../../assets/img/nrbus.jpeg';
import nrnyt from '../../assets/img/nrnyt.jpeg';
import nrsl from '../../assets/img/nrsl.jpeg';

const SelectSeat = () => {

  

  const { parent_route, operator_id, date_of_journey, origin, destination } = AuthAction.getState('auth');
  const navigate = useNavigate();

  const [boardingData, setBoardingData] = useState([]);
  const [boardingPoints, setBoardingPoints] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);
  
  const [locations, setLocations] = useState({
    start: { location: origin || 'Origin' },
    end: { location: destination || 'Destination' }
  });

  const fetchBoarding = async () => {
    try {
      const payload = {
        source: origin,
        destination,
        date: date_of_journey,
        parent_route,
        operator_id,
      };
      const res = await axios.post('/api/get-boarding-detail', payload);
      
      if (res.data.status === 200 && res.data.data) {
        const data = res.data.data;
        setBoardingData(data);
        
        // Extract boarding points with proper null checks
        setBoardingPoints(data.map(d => ({
          time: d.boarding_time ? d.boarding_time.slice(0, 5) : '--:--',
          point: d.boarding_point || 'Not specified'
        })));
        
        // Extract dropping points with proper null checks
        setDroppingPoints(data.map(d => ({
          time: d.dropping_time ? d.dropping_time.slice(0, 5) : '--:--',
          point: d.dropping_point || 'Not specified'
        })));
        
        // Update locations if needed
        setLocations({
          start: { location: origin || data[0]?.boarding_point || 'Origin' },
          end: { location: destination || data[0]?.dropping_point || 'Destination' }
        });
      }
    } catch (err) {
      console.error('Failed to fetch boarding details', err);
    }
  };

  useEffect(() => {
    fetchBoarding();
  }, []);

  useEffect(() => {
  if (boardingPoints.length && droppingPoints.length) {
    AuthAction.updateState({
      boardingPoint: {
        location: boardingPoints[0].point,
        time: boardingPoints[0].time,
      },
      droppingPoint: {
        location: droppingPoints[0].point,
        time: droppingPoints[0].time,
      },
    });
  }
  }, [boardingPoints, droppingPoints]);

  const formatDuration = (minutes) => {
    if (!minutes) return '--:--';
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };


useEffect(() => {
  const reload = () => window.location.reload();
  window.addEventListener('reload', reload);
  return () => window.removeEventListener('reload', reload);
}, []);


  const handleNavigate =()=>{
    const {seatSelected} = AuthAction.getState('auth')
    if(seatSelected == true){
      navigate('/passenger-info')
    }else{
      alert('please select a seat');
    }
  }

  return (
    <>

 
   {!AuthAction.getState('auth').isAuthenticated && <LoginModal />}

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
              <img src={nrbus} alt="bus1" className="img-fluid" />
              <img src={nrnyt} alt="bus2" className="img-fluid" />
              <img src={nrsl} alt="bus3" className="img-fluid" />
            </div>

            <div className="routeDetails">
              <h5>Bus Route</h5>
              <p>{locations.start.location} → {locations.end.location}</p>
              <span>
                Duration: {boardingData[0]?.estimated_duration 
                  ? formatDuration(boardingData[0].estimated_duration) 
                  : '--:--'}
              </span>
            </div>

            <hr />

            <div className="boardingDropping row blackText">
                <div className="col-lg-6 col-md-12 mb-3">
                    <div className="boardingPoint">
                    <h5>Boarding Point</h5>
                    <span>{locations.start.location}</span>
                    <div className="points">
                        {boardingPoints.map((bp, idx) => (
                        <p key={`boarding-${idx}`}>{bp.time} → {bp.point}</p>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-12 mb-3">
                    <div className="boardingPoint">
                    <h5>Dropping Point</h5>
                    <span>{locations.end.location}</span>
                    <div className="points">
                        {droppingPoints.map((dp, idx) => (
                        <p key={`dropping-${idx}`}>{dp.time} → {dp.point}</p>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="selectPoint active">
        <h5 onClick={()=>handleNavigate()}>FILL PASSENGER INFORMATION <span style={{ marginLeft: '10px' }}></span></h5>
      </div>
    </>
  );
};

export default SelectSeat;