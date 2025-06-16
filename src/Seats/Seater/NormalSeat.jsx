import React, { useEffect, useState } from 'react';
import './seatStyle.css';
import axios from 'axios';
import Load from '../../ReUsable/LoadingUI/Loading';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';

const NormalSeat = () => {
    let user_id = AuthAction.getState('auth')?.userId;
    let gender = AuthAction.getState('auth')?.gender;
    let bus_id = AuthAction.getState('auth')?.busId;

    const [loading, setLoading] = useState(false);

    const total_row = 10;
    const layout = 3;
    
    const blockedForMale = [1,4,7,10];
    const alreadyBooked = [3,6,9];
    const [seatOnHold, setSeatOnHold] = useState([]);
    const [currentHold, setCurrentHold] = useState([]) // do not delete or merge this state it will create mess readme1.1
    

    const fetchData = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const res = await axios.get('/api/view-bus-seat-configs', {
                    params:{ bus_id: bus_id, seat_type: 'seater'}
                });
       
                if(res.data.status == 200){
                    // Read the logic: readMe v1.2
                    const matchingSeats = res.data.seatsOnHold.filter(item => item.user_id === user_id).map(item => item.seat_no);
                    setCurrentHold(matchingSeats);
                    setSeatOnHold(res.data.seatsOnHold.map(item => item.seat_no));
                }       
            
            } catch (err) {
                console.error(err);
            } finally{
                setLoading(false);
            }
    };

    useEffect(() => {
        // using this code to calculate the price real time in viewSeat compo
        if (currentHold.length >= 0) {
            const value = currentHold.length;
            localStorage.setItem('seaterCount', value.toString());
            window.dispatchEvent(new Event('seaterCountChanged'));
        }     
    }, [currentHold]);
     
    useEffect(() => {
        
      

    fetchData();
    }, []);

    useEffect(() => {
        // don't add in sleeper compo, fired from any one works fine does the job
        const handler = () => {
            window.location.reload();
        }
        window.addEventListener('blockedForMale', handler);
        return () => window.removeEventListener('blockedForMale', handler);
    }, []);

    async function selectSeat(seatNumber) {
        try {   
        
            let exist = currentHold.includes(seatNumber);
            
            if(exist){
                //release seat if exist true
                await axios.get('/sanctum/csrf-cookie');
                const res = await axios.post('/api/real-time-seat-release', { seat_no: seatNumber,bus_id: bus_id, seat_type:'seater', user_id:user_id});
    
                if(res.data.status == 200){
                    setCurrentHold(prev => prev.filter(seat => seat !== seatNumber));
                    setSeatOnHold(prev => prev.filter(seat => seat !== seatNumber));
                }
      
            } else {
             
                await axios.get('/sanctum/csrf-cookie');
                const res = await axios.post('/api/real-time-seat-update', { seat_no: seatNumber, bus_id: bus_id, seat_type:'seater', user_id:user_id});
            
                if(res.data.status == 200){          
                    setCurrentHold(prev => [...prev, res.data.seat_no]);
                }

                if (res.data.status == true){
                    // Extract `seat_no` from each object in `res.data.data` and update `seatOnHold`
                    const newSeats = res.data.data.map(item => item.seat_no);
                    setSeatOnHold(prev => [...prev, ...newSeats]);
                }

            }

            await fetchData(); // fetch updated state after action
     
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }


  return (

    <div className="seat-container">
        {Load.now(loading)}
        <h4 className='blackText'>Standard Seats</h4>

        {Array.from({ length: total_row }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
            
            {/* Layout 2 */}
                {layout === 2 &&
                    // run the code layout times = cols
                    Array.from({ length: layout }).map((_, i) => {
                            
                        const seatNumber = rowIndex * 2 + i + 1; // 0*2*0+1 since i starts with zero

                        const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                        const isBooked = alreadyBooked.includes(seatNumber);
                        const isHoldByYou = currentHold.includes(seatNumber);
                        const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;
                        const isSelected = isHoldByYou; // held by user = selected


                        return (
                            <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }} className='seat-row-mobile'>
                                <div
                                    className="seats"
                                    style={{
                                        backgroundColor
                                        : isBooked
                                        ? '#05a715'
                                        : isHoldByYou || isHoldByOthers
                                        ? 'black'
                                        : 'white',

                                        pointerEvents:  isBooked || isHoldByOthers ? 'none' : 'auto',
                                        color: isBooked || isHoldByYou || isHoldByOthers ? 'white' : 'black',
                                        fontSize: '7px',
                                        textAlign: 'center',
                                        lineHeight: '20px',
                                        userSelect: 'none',
                                    }}
                                    onClick={() => !isBooked && !isHoldByOthers && selectSeat(seatNumber)}
                                >
                                    {seatNumber}
                                </div>

                                {isBooked && (
                                <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>
                                )}
                                {isHoldByOthers && (
                                <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>
                                    On Hold
                                </p>
                                )}
                                {isHoldByYou && (
                                <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>
                                    Held
                                </p>
                                )}
                            </div>
                        );

                    })
                }

            {/* Layout 3 */}
                {layout === 3 && (
                    <>
                        {/* Left seat */}
                        <div style={{ display: 'flex', gap: '10px' }} className='seat-row-mobile'>
                            {[0].map((_, i) => {
                                const seatNumber = rowIndex * 3 + 1 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHoldByYou = currentHold.includes(seatNumber);
                                const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;
                                const isSelected = isHoldByYou;

                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked
                                                    ? '#388181'
                                                    : isBooked
                                                    ? '#05a715'
                                                    : isHoldByYou || isHoldByOthers
                                                    ? 'black'
                                                    : 'white',
                                                pointerEvents: isBlocked || isBooked || isHoldByOthers ? 'none' : 'auto',
                                                color: isBooked || isHoldByYou || isHoldByOthers ? 'white' : 'black',
                                                fontSize: '7px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none',
                                                marginRight: 'auto'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHoldByOthers && selectSeat(seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHoldByOthers && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                        {isHoldByYou && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>Held</p>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right seats */}
                        <div style={{ display: 'flex', gap: '10px' }} className='seat-row-mobile'>
                            {[1, 2].map(i => {
                                const seatNumber = rowIndex * 3 + 1 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHoldByYou = currentHold.includes(seatNumber);
                                const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;
                                const isSelected = isHoldByYou;

                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '2px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked
                                                    ? '#388181'
                                                    : isBooked
                                                    ? '#05a715'
                                                    : isHoldByYou || isHoldByOthers
                                                    ? 'black'
                                                    : 'white',
                                                pointerEvents: isBlocked || isBooked || isHoldByOthers ? 'none' : 'auto',
                                                color: isBooked || isHoldByYou || isHoldByOthers ? 'white' : 'black',
                                                fontSize: '7px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHoldByOthers && selectSeat(seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHoldByOthers && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                        {isHoldByYou && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>Held</p>}
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
                        <div style={{ display: 'flex', gap: '10px' }} className='seat-row-mobile'>
                            {[1, 2].map(i => {
                                const seatNumber = rowIndex * 4 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHoldByYou = currentHold.includes(seatNumber);
                                const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;

                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '1px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked
                                                    ? '#388181'
                                                    : isBooked
                                                    ? '#05a715'
                                                    : isHoldByYou || isHoldByOthers
                                                    ? 'black'
                                                    : 'white',
                                                pointerEvents: isBlocked || isBooked || isHoldByOthers ? 'none' : 'auto',
                                                color: isBooked || isHoldByYou || isHoldByOthers ? 'white' : 'black',
                                                fontSize: '7px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHoldByOthers && selectSeat(seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHoldByOthers && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                        {isHoldByYou && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>Held</p>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom row seats (3-4) */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '1px' }} className='seat-row-mobile'>
                            {[3, 4].map(i => {
                                const seatNumber = rowIndex * 4 + i;
                                const isBlocked = gender === 'male' && blockedForMale.includes(seatNumber);
                                const isBooked = alreadyBooked.includes(seatNumber);
                                const isHoldByYou = currentHold.includes(seatNumber);
                                const isHoldByOthers = seatOnHold.includes(seatNumber) && !isHoldByYou;

                                return (
                                    <div key={seatNumber} style={{ textAlign: 'center', fontSize: '10px', marginTop: '1px' }}>
                                        <div
                                            className="seats"
                                            style={{
                                                backgroundColor: isBlocked
                                                    ? '#388181'
                                                    : isBooked
                                                    ? '#05a715'
                                                    : isHoldByYou || isHoldByOthers
                                                    ? 'black'
                                                    : 'white',
                                                pointerEvents: isBlocked || isBooked || isHoldByOthers ? 'none' : 'auto',
                                                color: isBooked || isHoldByYou || isHoldByOthers ? 'white' : 'black',
                                                fontSize: '7px',
                                                textAlign: 'center',
                                                lineHeight: '20px',
                                                userSelect: 'none'
                                            }}
                                            onClick={() => !isBlocked && !isBooked && !isHoldByOthers && selectSeat(seatNumber)}
                                        >
                                            {seatNumber}
                                        </div>
                                        
                                        {isBlocked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Female</p>}
                                        {isBooked && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center' }}>Booked</p>}
                                        {isHoldByOthers && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>On Hold</p>}
                                        {isHoldByYou && <p style={{ marginTop: -6, fontSize: '8px', textAlign: 'center', color: 'black' }}>Held</p>}
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
