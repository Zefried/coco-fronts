import React, { useEffect, useState } from 'react';
import './sleeper.css';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const SleeperUI = () => {
  const { userId } = AuthAction.getState('auth');
  const user_id = userId;

  const { parent_route, date_of_journey, operator_id } = AuthAction.getState('auth') ?? {};

  const [total_row, setTotalRow] = useState(0);
  const [layout, setLayout] = useState(0);

  const lastSeat = total_row * layout;

  const [availableForFemale, setAvailableForFemale] = useState([]);
  const [alreadyBooked, setAlreadyBooked] = useState([]);
  const [femaleBooked, setFemaleBooked] = useState([]);

  const [currentHold, setCurrentHold] = useState([]);
  const [seatOnHold, setSeatOnHold] = useState([]);

  const fetchSeatUI = async () => {
    try {
      const res = await axios.post('/api/fetch-seat-ui', {
        operator_id,
        seat_type: 'sleeper',
      });
      const layoutData = res.data.data?.[0];
      if (layoutData) {
        setTotalRow(layoutData.row);
        setLayout(layoutData.col);
      }
    } catch (error) {
      console.error('Failed to fetch seat layout:', error);
    }
  };

  const fetchSeatData = async () => {
    try {
      const res = await axios.post('/api/fetch-seat-data', {
        operator_id,
        parent_route,
        date: date_of_journey,
        seat_type: 'sleeper',
      });
      const data = res.data.data;
      setAvailableForFemale(JSON.parse(data.available_for_female || '[]'));
      setAlreadyBooked(JSON.parse(data.booked || '[]'));
      setFemaleBooked(JSON.parse(data.female_booked || '[]'));
      setSeatOnHold((JSON.parse(data?.seat_on_hold?.sleeper || '[]')).map(Number));
    } catch (error) {
      console.error('Failed to fetch seat data:', error);
    }
  };

  const fetchSeatHoldData = async () => {
    try {
      const res = await axios.post('/api/seat-hold-config', {
        operator_id,
        parent_route,
        date: date_of_journey,
        seat_type: 'sleeper',
        type: 'retrieve',
      });
      const sleeperHolds = res.data.data?.sleeper || [];
      const numericSeats = sleeperHolds.map(Number);
      setSeatOnHold(numericSeats);
      setCurrentHold(numericSeats);
    } catch (error) {
      console.error('Failed to fetch seat hold data:', error);
    }
  };

  const selectSeat = async (seatNumber) => {
    const isBooked = alreadyBooked.includes(seatNumber);
    const isHeldByOthers = seatOnHold.includes(seatNumber) && !currentHold.includes(seatNumber);
    if (isBooked || isHeldByOthers) return;

    try {
      const payload = {
        user_id,
        operator_id,
        parent_route,
        date: date_of_journey,
        seat_type: 'sleeper',
        type: 'storeRelease',
        seat_no: JSON.stringify(seatNumber),
      };

      const res = await axios.post('/api/seat-hold-config', payload);
      AuthAction.updateState({seatSelected:true})
      if (res.data.status === 200) {
        await fetchSeatHoldData();
      } else if (res.data.status === 403) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Failed to hold/release seat:', error);
    }
  };

  useEffect(() => {
    if (operator_id) {
      fetchSeatHoldData();
      fetchSeatData();
      fetchSeatUI();
    }
  }, [operator_id]);

  const renderSeat = (seatNumber) => {
    const isFemaleRecommended = availableForFemale.includes(seatNumber);
    const isBooked = alreadyBooked.includes(seatNumber);
    const isHoldByYou = currentHold.includes(seatNumber);
    const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;

    let bgColor = 'white';
    let textColor = 'black';
    let label = '';

    if (isBooked) {
      bgColor = '#05a715';
      textColor = 'white';
      label = 'Booked';
    } else if (isHoldByYou) {
      bgColor = 'black';
      textColor = 'white';
      label = 'Held';
    } else if (isHoldByOthers) {
      bgColor = 'black';
      textColor = 'white';
      label = 'On Hold';
    } else if (isFemaleRecommended) {
      label = 'Female';
    }

    const disabled = isBooked || isHoldByOthers;

    return (
      <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px' }}>
        <div
          className="sleeper"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            pointerEvents: disabled ? 'none' : 'auto',
            userSelect: 'none',
            fontSize: '7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...(isFemaleRecommended && {
              '--borderColorLeft': '#FF00FF',
              '--borderColorRight': '#FF00FF',
              '--borderColorBottom': '#FF00FF',
            }),
          }}
          onClick={() => selectSeat(seatNumber)}
        >
          {seatNumber}
        </div>
        {label && (
          <p
            style={{
              fontSize: '6px',
              margin: '2px 0 0 0',
              lineHeight: '10px',
              height: '12px',
              overflow: 'hidden',
            }}
          >
            {label}
          </p>
        )}
      </div>
    );
  };

    
  

  return (
    <div className="seat-wrapper">
      <div className="seat-container">
        <h4 className="blackText">Standard Seats</h4>
        {Array.from({ length: total_row }).map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '10px' }}>
            {Array.from({ length: layout }).flatMap((_, colIndex) => {
              const seatNumber = rowIndex * layout + colIndex + 1;
              return colIndex === 1
                ? [<div key={`spacer-${seatNumber}`} style={{ width: '20px' }} />, renderSeat(seatNumber)]
                : renderSeat(seatNumber);
            })}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {Array.from({ length: 3 }).flatMap((_, idx) => {
            const seatNumber = lastSeat + idx + 1;
            return idx === 1
              ? [<div key={`spacer-${seatNumber}`} style={{ width: '20px' }} />, renderSeat(seatNumber)]
              : renderSeat(seatNumber);
          })}
        </div>
      </div>
    </div>
  );
};

export default SleeperUI;
