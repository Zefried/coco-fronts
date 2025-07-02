import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import './PaymentInfo.css';
import { useNavigate } from 'react-router-dom';

const PaymentInfoPage = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [buttonHover, setButtonHover] = useState(false);
  const {
    userId,
    parent_route,
    operator_id,
    date_of_journey,
    name,
    gender,
    boardingPoint,
    droppingPoint,
    origin,
    destination,
    totalFare
  } = AuthAction.getState('auth');

  const calculateDuration = () => {
    if (!boardingPoint?.time || !droppingPoint?.time) return '';
    
    const formatTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return new Date().setHours(hours, minutes, 0, 0);
    };
    
    const diffMs = formatTime(droppingPoint.time) - formatTime(boardingPoint.time);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m`;
  };

  const userPaymentInfo = async () => {
    const payload = {
      user_id: userId,
      parent_route,
      operator_id,
      date: date_of_journey,
    };
    try {
      const res = await axios.post('/api/get-user-pnr-data', payload);
      setPassengers(res.data.data);
    } catch (err) {
      console.error("API call failed", err);
    }
  };

  useEffect(() => {
    userPaymentInfo();
  }, []);

  const baseFare = Math.floor(totalFare * 0.8);
  const taxes = totalFare - baseFare;
  const duration = calculateDuration();
  const bookingId = `BOOK${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    const handleTicketGenerate = async () => {
        const payload = {
            booking_id: bookingId,
            total_fare: totalFare,
            base_fare: baseFare,
            taxes,
            user_id: userId,
            name,
            gender,
            parent_route,
            operator_id,
            date_of_journey,
            origin,
            destination,
            boarding_point: boardingPoint,
            dropping_point: droppingPoint,
            duration,
            passengers,
        };
        const res = await axios.post('/api/generate-user-ticket', payload);
        
        if(res.data.status !== 200){
          alert('please check bookings or contact support 7827379351')
        }
      navigate('/bookings')
       
    };

  return (
    <div className="payment-container">
      <div className="ticket-card">
        {/* Ticket Header */}
        <div className="ticket-header">
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: '600' }}>E-Ticket Confirmation</h2>
          <div className="booking-id">Booking ID: {bookingId}</div>
        </div>

        {/* Ticket Body */}
        <div className="ticket-body">
          {/* Route Summary */}
          <div className="route-summary">
            <div style={{ textAlign: 'center' }}>
              <div className="location">{origin}</div>
              <div className="time">{boardingPoint.time}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="route-line">
                <div className="route-arrow">→</div>
              </div>
              <div className="duration">{duration}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="location">{destination}</div>
              <div className="time">{droppingPoint.time}</div>
            </div>
          </div>

          {/* Passenger & Journey Details */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '15px' }}>
              {/* <div style={{ flex: 1 }}>
                <div className="detail-label">Passenger Name</div>
                <div className="detail-value">{name} ({gender})</div>
              </div> */}
              <div style={{ flex: 1 }}>
                <div className="detail-label">Journey Date</div>
                <div className="detail-value">{date_of_journey}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <div className="detail-label">Boarding Point</div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>{boardingPoint.location}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="detail-label">Dropping Point</div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>{droppingPoint.location}</div>
              </div>
            </div>
          </div>

          {/* Passengers List */}
          <div style={{ marginBottom: '25px' }}>
            <div className="passenger-section-title">Passenger Details</div>
            {passengers.map((p, idx) => (
              <div key={idx} className={`passenger-item ${idx % 2 === 0 ? 'even' : 'odd'}`}>
                <div>
                  <div className="passenger-name">{p.name} ({p.gender})</div>
                  <div className="passenger-pnr">PNR: {p.pnr}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="seat-number">{p.seat_no}</div>
                  <div className="seat-type">{p.seat_type}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fare Summary */}
          <div className="fare-summary">
            <div className="fare-row">
              <span>Base Fare</span>
              <span style={{ fontWeight: '500' }}>₹{baseFare}</span>
            </div>
            <div className="fare-row">
              <span>Taxes & Fees</span>
              <span style={{ fontWeight: '500' }}>₹{taxes}</span>
            </div>
            <div className="total-fare">
              <span>Total Amount</span>
              <span>₹{totalFare}</span>
            </div>
          </div>

          {/* Action Button */}

         <div className='d-flex gap-3'>
            <button 
                disabled
                className="pay-button"
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                style={{
                transform: buttonHover ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: buttonHover ? '0 6px 16px rgba(214, 44, 44, 0.3)' : '0 4px 12px rgba(214, 44, 44, 0.2)'
                }}
            >
                Pay Now
            </button>

            <button 
                className="pay-button"
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                style={{
                transform: buttonHover ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: buttonHover ? '0 6px 16px rgba(214, 44, 44, 0.3)' : '0 4px 12px rgba(214, 44, 44, 0.2)'
                }}
                onClick={()=>handleTicketGenerate()}
            >
                Pay on Board
            </button>
            </div>
                    

          {/* Footer Note */}
          <div className="footer-note">
            Please carry a printout of this e-ticket and present it to the driver along with valid ID proof.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoPage;