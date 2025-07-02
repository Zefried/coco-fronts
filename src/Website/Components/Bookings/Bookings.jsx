import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import './Bookings.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBus, FaSadTear } from 'react-icons/fa';

const Bookings = () => {
  const [buttonHover, setButtonHover] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  const { userId } = AuthAction.getState('auth');
  
  const fetchTickets = async (date = null) => {
    try {
      setLoading(true);
      const payload = { user_id: userId };
      if (date) {
        payload.date_of_journey = date;
      }
      const res = await axios.post("/api/get-user-tickets", payload);
      if (res.data.status === 200) {
        const parsedTickets = res.data.data.map(ticket => ({
          ...ticket,
          passengers: JSON.parse(ticket.passengers)
        }));
        setTickets(parsedTickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTickets();
  }, [userId]);

  const handleDateFilter = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    if (date) {
      fetchTickets(date);
      setShowAll(false);
    } else {
      fetchTickets();
      setShowAll(true);
    }
  };

  const handleTicketGenerate = () => {
    // Your ticket generation logic
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h3 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer', color: '#e74c3c' }}>← Back to Home</h3>
        <h1>Your Bookings</h1>
        
        <div className="filter-controls">
          <div className="date-filter">
            <input
              type="date"
              value={filterDate}
              onChange={handleDateFilter}
              className="date-input"
            />
          </div>
          {!showAll && (
            <button 
              className="show-all-btn"
              onClick={() => {
                setFilterDate('');
                fetchTickets();
                setShowAll(true);
              }}
            >
              Show All Bookings
            </button>
          )}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <FaSadTear className="empty-icon" />
            <h2>No Bookings Found</h2>
            <p>You don't have any bookings {filterDate ? `for ${filterDate}` : ''}</p>
            <p className="offer-text">
              Book with us today and enjoy great deals! <br />
              <span className="highlight">Get free credits on your first booking!</span>
            </p>
            <div className="bus-animation">
              <FaBus className="bus-icon" />
              <div className="road"></div>
            </div>
            <button className="book-now-btn">
              Book Now
            </button>
          </div>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              {/* Ticket Header */}
              <div className="ticket-header">
                <h2>E-Ticket Confirmation</h2>
                <div className="booking-id">Booking ID: {ticket.booking_id}</div>
                <div className={`payment-status ${ticket.payment_status}`}>
                  {ticket.payment_status.toUpperCase()}
                </div>
              </div>

              {/* Ticket Body */}
              <div className="ticket-body">
                {/* Route Summary */}
                <div className="route-summary">
                  <div className="route-point">
                    <div className="location">{ticket.source}</div>
                    <div className="time">{ticket.boarding_point}</div>
                  </div>
                  <div className="route-middle">
                    <div className="route-line">
                      <div className="route-arrow">→</div>
                    </div>
                    <div className="duration">{ticket.duration}</div>
                  </div>
                  <div className="route-point">
                    <div className="location">{ticket.destination}</div>
                    <div className="time">{ticket.dropping_point}</div>
                  </div>
                </div>

                {/* Passenger & Journey Details */}
                <div className="journey-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">Journey Date:</span>
                      <span className="detail-value">{ticket.date_of_journey}</span>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">Boarding Point:</span>
                      <span className="detail-value">{ticket.boarding_point}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Dropping Point:</span>
                      <span className="detail-value">{ticket.dropping_point}</span>
                    </div>
                  </div>
                </div>

                {/* Passengers List */}
                <div className="passengers-section">
                  <div className="passenger-section-title">Passenger Details</div>
                  {ticket.passengers.map((p, idx) => (
                    <div key={idx} className={`passenger-item ${idx % 2 === 0 ? 'even' : 'odd'}`}>
                      <div className="passenger-info">
                        <div className="passenger-name">{p.name} ({p.gender})</div>
                        <div className="passenger-pnr">PNR: {p.pnr}</div>
                      </div>
                      <div className="passenger-seat">
                        <div className="seat-number">Seat: {p.seat_no}</div>
                        <div className="seat-type">{p.seat_type}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fare Summary */}
                <div className="fare-summary">
                  <div className="fare-row">
                    <span>Base Fare</span>
                    <span>₹{ticket.base_fare}</span>
                  </div>
                  <div className="fare-row">
                    <span>Taxes & Fees</span>
                    <span>₹{ticket.taxes}</span>
                  </div>
                  <div className="total-fare">
                    <span>Total Amount</span>
                    <span>₹{ticket.total_fare}</span>
                  </div>
                </div>

               
                {/* Footer Note */}
                <div className="footer-note">
                  Please carry a printout of this e-ticket and present it to the driver along with valid ID proof.
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;