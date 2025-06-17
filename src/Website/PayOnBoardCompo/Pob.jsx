import React, { useEffect, useState } from 'react';
import './pob.css';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayOnBoard = () => {
  const navigate = useNavigate();
  const [ticketConfirmed, setTicketConfirmed] = useState(false);

  const [ticket, setTicket] = useState({
    logo: 'https://nrbuss.com/assets/logo1-CSrs-mow.png',
    supportNumber: 'Travel related queries: 8800879898',
    ticketNo: 'Pending - Please Select PayOnBoard',
    pnr: '',
    date: '',
    operator: '',
    route: '',
    passengers: [],
    busType: '',
    plateNo:'',
    reportingTime: '09:45 PM',
    departureTime: '10:00 PM',
    fare: '',
    boarding: {
      location: '',
      landmark: '',
      address: '',
    },
    driverName: '',
    driverPhone: '',
    driverTwoName: '',
    driverTwoPhone: ''
  });

  const { userId, busId, RouteInfoId, origin, destination, booking_id, date_of_journey } = AuthAction.getState('auth') || {};

  const fetchBookingData = async () => {
    const payload = {
      user_id: userId,
      bus_id: busId,
      routeInfoId: RouteInfoId,
      origin,
      destination,
      booking_id,
      date_of_journey,
    };

    const res = await axios.post('/api/fetch-data-for-payOnBoard', payload);
    if (res.data.status === 200) {
      const { bookingData, busData, seatData, routeInfoData } = res.data.data;

      const passengers = seatData.map(s => ({
        seat: s.seat_no,
        name: s.name,
        gender: s.gender
      }));

      const parsedBoardingPoints = JSON.parse(routeInfoData.boarding_points || '[]');
      const boardingPoint = parsedBoardingPoints[0] || {};

      const boarding = {
        location: boardingPoint.location || 'NA',
        landmark: boardingPoint.location || 'NA',
        address: `Boarding Time: ${boardingPoint.time || 'NA'} at ${boardingPoint.location || 'NA'}`
      };

      setTicket(prev => ({
        ...prev,
        operator: busData.operator_name,
        busType: busData.bus_config,
        plateNo: busData.bus_plate_number,
        pnr: bookingData.pnr_code,
        fare: bookingData.total_fare,
        route: `${bookingData.origin} to ${bookingData.destination}`,
        date: new Date(bookingData.date_of_journey).toDateString(),
        passengers,
        boarding,
        driverName: busData.driver_name,
        driverPhone: busData.driver_phone,
        driverTwoName: busData.driverTwo_name,
        driverTwoPhone: busData.driverTwo_phone
      }));
    }
  };

  const callPayOnBoard = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: userId,
        bus_id: busId,
        routeInfoId: RouteInfoId,
        origin,
        destination,
        booking_id,
        date_of_journey,
        pnr: ticket.pnr,
        date: ticket.date,
        operator: ticket.operator,
        route: ticket.route,
        passengers: ticket.passengers,
        busType: ticket.busType,
        plateNo: ticket.plateNo,
        reportingTime: ticket.reportingTime,
        departureTime: ticket.departureTime,
        fare: ticket.fare,
        boarding: ticket.boarding.location,
        driverName: ticket.driverName,
        driverPhone: ticket.driverPhone,
        driverTwoName: ticket.driverTwoName,
        driverTwoPhone: ticket.driverTwoPhone
      };

      const res = await axios.post('/api/pay-on-board', payload);

      if (res.data.status === 200) {
          setTicket(prev => ({ ...prev, ticketNo: res.data.data.unique_ticket_no }));
          setTicketConfirmed(true);
          navigate('/view-my-tickets');
      } else if (res.data.expiredStatus === true) {
          alert('Oops, sorry! Your session has expired. Please try booking again.');
          navigate('/home');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again later.');
    }
  };


  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <div className="bus-ticket">
      <header className="bt-header">
        <img src={ticket.logo} alt="NRBus Logo" />
        <span>{ticket.supportNumber}</span>
      </header>

      <main className="bt-main">
        <p><strong>{ticket.date}</strong></p>
        <p><strong>{ticket.operator}</strong></p>
        <p>{ticket.route}</p>

        <div className="bt-info">
          <p>Ticket: <strong>{ticket.ticketNo}</strong></p>
          <p>PNR: <strong>{ticket.pnr}</strong></p>
          <p>Bus NamePlate: <strong>{ticket.plateNo}</strong></p>

          {ticket.passengers.map((p, i) => (
            <p key={i}>
              Passenger {i + 1}: <strong>{p.name}</strong> | Seat: <strong>{p.seat}</strong> | Gender: <strong>{p.gender}</strong>
            </p>
          ))}

          <p>Bus Type: <strong>{ticket.busType}</strong></p>
          <p>Reporting Time: <strong>{ticket.reportingTime}</strong></p>
          <p>Departure Time: <strong>{ticket.departureTime}</strong></p>
          <p>Total Fare: <strong>Rs. {ticket.fare}</strong></p>

          {!ticket.ticketNo.includes('Pending') && (
            <>
              <p>Driver 1: <strong>{ticket.driverName || 'Select PayOnBoard'}</strong> ({ticket.driverPhone || 'Select PayOnBoard'})</p>
              <p>Driver 2: <strong>{ticket.driverTwoName || 'Select PayOnBoard'}</strong> ({ticket.driverTwoPhone || 'Select PayOnBoard'})</p>
            </>
          )}
        </div>

        <div className="bt-boarding">
          <p><strong>Boarding point address</strong></p>
          <p>Location: {ticket.boarding.location}</p>
          <p>Landmark: {ticket.boarding.landmark}</p>
          <p>Address: {ticket.boarding.address}</p>
        </div>

        <div className="bt-actions">
  
            <button onClick={(e) => { callPayOnBoard(e) }}>Pay on board</button>
    
        </div>
      </main>
    </div>
  );
};

export default PayOnBoard;


