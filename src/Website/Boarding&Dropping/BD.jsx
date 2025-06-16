import React, { useEffect, useState } from 'react';
import './bd.css';
import axios from 'axios';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';

const BoardingDropping = () => {
  const authState = AuthAction.getState('auth') || {};
  const { userRoute, origin, destination, busId } = authState;

  const [points, setPoints] = useState({ boarding: [], dropping: [] });
  const [selectedPoints, setSelectedPoints] = useState({ boarding: '', dropping: '' });

  useEffect(() => {
    if (!userRoute) return;
    const payload = { origin, destination, bus_id: busId };
    const fetchBoardDropInfo = async () => {
      try {
        const res = await axios.post('/api/boarding-dropping-info', payload);
        if (res.data.status === 200) {
          const bdData = res.data.data;
          const routeInfoId = bdData.id;
      
          setPoints({
            boarding: JSON.parse(bdData.boarding_points),
            dropping: JSON.parse(bdData.dropping_points),
          });
          AuthAction.updateState({RouteInfoId:routeInfoId});
        }
      } catch (e) {
        console.log('err', e);
      }
    };
    fetchBoardDropInfo();
  }, []);

 

  const boardDropSelected = async (e) => {

    try{
        e.preventDefault()
        if (!selectedPoints.boarding || !selectedPoints.dropping) return;

        let authState = AuthAction.getState('auth');
        const {userId, busId, origin, destination, RouteInfoId } = authState;
        let payload = {
          'user_id':userId,
          'bus_id':busId,
          'origin':origin,
          'destination':destination,
          'route_info_id':RouteInfoId,
          'selected_points':selectedPoints
        }
        console.log(payload);

        const res = await axios.post('/api/continue-booking', payload);
        
        if(res.data.status == 200){
          console.log(res.data.data);
        }

    }catch(e){
      console.log('err', e);
    }

  };

  return (
    <div className="container py-5">
      <div className="destinationBar">
        <div className="closeIcon"><i className="ri-close-fill" /></div>
        <p>{userRoute?.start?.location} → {userRoute?.end?.location}</p>
      </div>

      <div className="wrap-bd">
        <form id="pointsForm">
            <div className="box-wrapper">
              <div className="bd-box">
                <h3>Boarding point</h3>
                <hr />
                {points.boarding.map((bp, i) => (
                  <div className="bp" key={i}>
                    <div className="timePlace">
                      <p>{bp.time}</p>
                      <label className="bd-label">{bp.location}</label>
                    </div>
                    <input
                      type="radio"
                      name="boarding"
                      value={bp.location}
                      onChange={() =>
                        setSelectedPoints(prev => ({ ...prev, boarding: bp.location }))
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="bd-box">
                <h3>Dropping point</h3>
                <hr />
                {points.dropping.map((dp, i) => (
                  <div className="bp" key={i}>
                    <div className="timePlace">
                      <p>{dp.time}</p>
                      <label className="bd-label">{dp.location}</label>
                    </div>
                    <input
                      type="radio"
                      name="dropping"
                      value={dp.location}
                      onChange={() =>
                        setSelectedPoints(prev => ({ ...prev, dropping: dp.location }))
                      }
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
            {
              selectedPoints.boarding && selectedPoints.dropping ? <button type="submit" className="bd-submit-btn" onClick={(e)=>boardDropSelected(e)}>Continue Booking</button> : ''
            }
          
        </form>
      </div>
    </div>

  );
};

export default BoardingDropping;
