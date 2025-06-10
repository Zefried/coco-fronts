import React from 'react';
import './seatStyle.css';

const NormalSeat = () => {
    
  let gender = 'male';
  const total_row = 10;
  const layout = 3;
  const blockedForMale = [1,4,7,10];
  const alreadyBooked = [3,6,9];
  const seatOnHold = [2,5,30];

  return (
    <div className="seat-container">
      <h4>Seaters</h4>
        {Array.from({ length: total_row }).map((_, rowIndex) => (
            
            <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
            
            {/* Layout 2 */}
                {layout === 2 &&
                    // run the code layout times = cols
                    Array.from({ length: layout }).map((_, i) => {
                        
                        const seatNumber = rowIndex * 2 + i + 1; // 0*2*0+1 since i starts with zero
                        const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                        const isBooked = alreadyBooked.includes(seatNumber); // Fixed: Check if seat is booked
                        const isHold = seatOnHold.includes(seatNumber);

                        return (
                            <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                                
                                <div
                                    className="seats"
                                    style={{
                                        backgroundColor: isBlocked ? '#388181' : isBooked ? '#05a715' : isHold ? 'black' : 'white', // Light gray for available
                                        pointerEvents: isBlocked || isBooked || isHold ? 'none' : 'auto',
                                        color: isBooked || isHold ? 'white' : 'black',
                                        fontSize: '7px',
                                        textAlign: 'center',
                                        lineHeight: '20px', // adjust based on seat height
                                        userSelect: 'none',
                                    
                                    }}
                                    onClick={() => !isBlocked && !isBooked && console.log('Seat:', seatNumber)} 
                                >
                                {
                                    seatNumber
                                }
                                </div>
                            
                                {isBlocked && (
                                    <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>
                                )}
                                {isBooked && (
                                    <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p> // Optional: Label booked seats
                                )}
                                 {isHold && (
                                    <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>
                                )}
                            </div>
                        );
                    })
                }

            {/* Layout 3 */}
                {layout === 3 && (
                    <>
                        {/* Left seat */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[0].map((_, i) => {
                                const seatNumber = rowIndex * 3 + 1 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHold = seatOnHold.includes(seatNumber);
                                
                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '8px', marginTop: '2px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked ? '#388181' : isBooked ? '#05a715' : isHold ? 'black' : 'white',
                                                pointerEvents: isBlocked || isBooked || isHold ? 'none' : 'auto',
                                                color: isBooked || isHold ? 'white' : 'black',
                                                fontSize: '8px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none',
                                                marginRight: 'auto'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHold && console.log('Seat number:', seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHold && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right seats */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[1, 2].map(i => {
                                const seatNumber = rowIndex * 3 + 1 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHold = seatOnHold.includes(seatNumber);
                                
                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '8px', marginTop: '2px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked ? '#388181' : isBooked ? '#05a715' : isHold ? 'black' : 'white',
                                                pointerEvents: isBlocked || isBooked || isHold ? 'none' : 'auto',
                                                color: isBooked || isHold ? 'white' : 'black',
                                                fontSize: '8px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHold && console.log('Seat number:', seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHold && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}


            {/* Layout 4 */}
                {layout === 4 && (
                    <>
                        {/* Top row seats (1-2) */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[1, 2].map(i => {
                                const seatNumber = rowIndex * 4 + i;

                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHold = seatOnHold.includes(seatNumber);
                                
                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '8px', marginTop: '1px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked ? '#388181' : isBooked ? '#05a715' : isHold ? 'black' : 'white',
                                                pointerEvents: isBlocked || isBooked || isHold ? 'none' : 'auto',
                                                color: isBooked || isHold ? 'white' : 'black',
                                                fontSize: '8px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHold && console.log('Seat number:', seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHold && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom row seats (3-4) */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '1px' }}>
                            {[3, 4].map(i => {
                                const seatNumber = rowIndex * 4 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHold = seatOnHold.includes(seatNumber);
                                
                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '8px', marginTop: '1px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked ? '#388181' : isBooked ? '#05a715' : isHold ? 'black' : 'white',
                                                pointerEvents: isBlocked || isBooked || isHold ? 'none' : 'auto',
                                                color: isBooked || isHold ? 'white' : 'black',
                                                fontSize: '8px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHold && console.log('Seat number:', seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHold && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
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
