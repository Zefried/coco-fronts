import React from 'react';
import './seatStyle.css';

const NormalSeat = () => {
  let gender = 'male';
  const total_row = 10;
  const layout = 4;
  const blockedForMale = [1, 2,3, 5, 6, 7, 8];

  return (
    <div className="seat-container">
      <h4>Seaters</h4>
      {Array.from({ length: total_row }).map((_, rowIndex) => (
        
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
          
          {/* Layout 2 */}
          {layout === 2 &&
            Array.from({ length: layout }).map((_, i) => {
              const seatNumber = rowIndex * 2 + i + 1;
              const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
              return (
                <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                  <div
                    className="seats"
                    style={{
                      backgroundColor: isBlocked ? '#388181' : undefined,
                      pointerEvents: isBlocked ? 'none' : 'auto',
                    }}
                    onClick={() => !isBlocked && console.log('Seat number:', seatNumber)}
                  />
                  {isBlocked && (
                    <p style={{ marginTop: -6, fontSize: '10px', textAlign: 'center' }}>Female</p>
                  )}
                </div>
              );
            })}

          {/* Layout 3 */}
          {layout === 3 && (
            <>
              {/* Left seat */}
              {(() => {
                
                const seatNumber = rowIndex * 3 + 1;
                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                
                return (
                  <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                    <div
                      className="seats"
                      
                      style={{
                        backgroundColor: isBlocked ? '#388181' : undefined,
                        pointerEvents: isBlocked ? 'none' : 'auto',
                        marginRight: 'auto',
                      }}

                      onClick={() => !isBlocked && console.log('Seat number:', seatNumber)}
                      
                    />

                    {isBlocked && (
                      <p style={{ marginTop: -6, fontSize: '10px', textAlign: 'center' }}>Female</p>
                    )}

                  </div>
                );
              })()}

              {/* Right seats */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2].map(i => {
                  const seatNumber = rowIndex * 3 + 1 + i;
                  const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                  return (
                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                      <div
                        className="seats"
                        style={{
                          backgroundColor: isBlocked ? '#388181' : undefined,
                          pointerEvents: isBlocked ? 'none' : 'auto',
                        }}
                        onClick={() => !isBlocked && console.log('Seat number:', seatNumber)}
                      />
                      {isBlocked && (
                        <p style={{ marginTop: -6, fontSize: '10px', textAlign: 'center' }}>Female</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}


          {/* Layout 4 */}
          {layout === 4 && (
            <>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {[1, 2].map(i => {
                        const seatNumber = rowIndex * 4 + i;
                        const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                        return (
                        <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                            <div
                            className="seats"
                            style={{
                                backgroundColor: isBlocked ? '#388181' : undefined,
                                pointerEvents: isBlocked ? 'none' : 'auto',
                            }}
                            onClick={() => !isBlocked && console.log('Seat number:', seatNumber)}
                            />
                            {isBlocked && <p style={{ marginTop: -6, fontSize: '10px', textAlign: 'center' }}>Female</p>}
                        </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '0px' }}>
                    {[3, 4].map(i => {
                        const seatNumber = rowIndex * 4 + i;
                        const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                        return (
                        <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                            <div
                            className="seats"
                            style={{
                                backgroundColor: isBlocked ? '#388181' : undefined,
                                pointerEvents: isBlocked ? 'none' : 'auto',
                            }}
                            onClick={() => !isBlocked && console.log('Seat number:', seatNumber)}
                            />
                            {isBlocked && <p style={{ marginTop: -6, fontSize: '10px', textAlign: 'center' }}>Female</p>}
                        </div>
                        );
                    })}
                </div>
            </>
          )}

        </div>
      ))}
    </div>
  );
};

export default NormalSeat;
