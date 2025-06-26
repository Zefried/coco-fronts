import React, { useEffect, useState } from 'react';
import './seater.css';
import axios from 'axios';

const SeaterUI = () => {
  const [total_row, setTotalRow] = useState(0);
  const [layout, setLayout] = useState(0);
  const lastSeat = total_row * layout; // rendering last 3 seats custom design


  const availableForFemale = [2, 5, 8, 39];
  const alreadyBooked = [3, 6];
  const currentHold = [4];
  const seatOnHold = [7];
  

  const selectSeat = (seatNumber) => {
    alert(`Seat ${seatNumber} selected`);
  };


   const fetchSeatUI = async () => {
      try {
        let payload = {
          operator_id: 1,
          seat_type: 'seater',
        };

        const res = await axios.post('/api/fetch-seat-ui', payload);
        const layoutData = res.data.data?.[0];

        if (layoutData) {
          setTotalRow(layoutData.row);
          setLayout(layoutData.col);
        }
      } catch (error) {
        console.error('Failed to fetch seat layout:', error);
      }
  };

  useEffect(()=>{
    fetchSeatUI();
  },[])



  return (
    <div className="seat-wrapper">
      <div className="seat-container">
        <h4 className="blackText">Standard Seats</h4>

        {Array.from({ length: total_row }).map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '10px' }}>
            {Array.from({ length: layout }).flatMap((_, colIndex) => {
              const seatNumber = rowIndex * layout + colIndex + 1;
              const isFemaleRecommended = availableForFemale.includes(seatNumber);
              const isBooked = alreadyBooked.includes(seatNumber);
              const isHoldByYou = currentHold.includes(seatNumber);
              const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;

              let bgColor = 'white';
              let textColor = 'black';
              let label = '';

              if (isFemaleRecommended) {
                bgColor = 'white';
                textColor = 'black';
                label = 'Female';
              } else if (isBooked) {
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
              }

              const seatComponent = (
                <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px' }}>
                  <div
                    className="seats"
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                      pointerEvents: isBooked || isHoldByOthers ? 'none' : 'auto',
                      userSelect: 'none',
                      fontSize: '7px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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

              return colIndex === 1
                ? [<div key={`spacer-${seatNumber}`} style={{ width: '20px' }} />, seatComponent]
                : seatComponent;
            })}
          </div>
        ))}

        {/* Manual extra seats */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {Array.from({ length: 3 }).flatMap((_, idx) => {
            const seatNumber = lastSeat + idx + 1;
            const isFemaleRecommended = availableForFemale.includes(seatNumber);
            const isBooked = alreadyBooked.includes(seatNumber);
            const isHoldByYou = currentHold.includes(seatNumber);
            const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;

            let bgColor = 'white';
            let textColor = 'black';
            let label = '';

            if (isFemaleRecommended) {
              bgColor = 'white';
              textColor = 'black';
              label = 'Female';
            } else if (isBooked) {
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
            }

            const seatComponent = (
              <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px' }}>
                <div
                  className="seats last-seats"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    pointerEvents: isBooked || isHoldByOthers ? 'none' : 'auto',
                    userSelect: 'none',
                    fontSize: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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

            return idx === 1
              ? [<div key={`spacer-${seatNumber}`} style={{ width: '20px' }} />, seatComponent]
              : seatComponent;
          })}
        </div>

      </div>
    </div>
  );
};

export default SeaterUI;
