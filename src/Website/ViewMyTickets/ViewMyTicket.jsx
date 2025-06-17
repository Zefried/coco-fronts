import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMyTicket.css';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';
import { useNavigate } from 'react-router-dom';
import jspdf from 'jspdf';

const TicketList = () => {
    const navigate = useNavigate();
    const {userId, name} = AuthAction.getState('auth') || {};
    const [tickets, setTickets] = useState([]);
    const [seatData, setSeatData] = useState([]);

    const fetchMyTicket = async () => {
        let user_id = userId;
        const res = await axios.post('/api/fetch-my-ticket', {user_id});
        if(res.data.status === 200){
            console.log(res.data.data);
            setTickets(res.data.data);
            setSeatData(res.data.seatData || []);
        }
    };

    useEffect(() => {
        fetchMyTicket();
    }, []);

    function handleGoHome(){
        AuthAction.resetState();
        navigate('/home') 
       
    }

    // New handler for WhatsApp sharing
   const handleWhatsApp = (ticket) => {
        const passengerList = seatData
        .filter(seat => seat.pnr_code === ticket.pnr_code)
        .map(seat => `${seat.name} ${seat.seat_no} (${seat.seat_type})`)
        .join('\n');

        const msg = 
        `*Ticket Details*\n
        Date           : ${ticket.date_of_journey}
        PNR            : ${ticket.pnr_code}
        Bus            : ${ticket.bus_type} (${ticket.plate_no})
        Route          : ${ticket.origin} → ${ticket.destination}
        Fare           : ₹${ticket.total_fare}\n
        *Passengers:*\n${passengerList}\n
        *Boarding Point:*
        Reporting Time : ${ticket.reporting_time || 'N/A'}\n
        *Drivers:*\n
        Driver 1       : ${ticket.driver_name} (${ticket.driver_number})
        Driver 2       : ${ticket.driver_two_name} (${ticket.driver_two_number})`;
            

        const phoneInput = prompt("Enter 10-digit WhatsApp number:");
        if(phoneInput && /^\d{10}$/.test(phoneInput)) {
            const phone = '91' + phoneInput;
            const encodedMsg = encodeURIComponent(msg);
            const whatsappURL = `https://wa.me/${phone}?text=${encodedMsg}`;
            window.open(whatsappURL, '_blank');
        } else {
            alert("Invalid phone number.");
        }
    };


    const handleDownload = (ticket) => {
        const doc = new jspdf();
        doc.setFontSize(12);
        let y = 10;
        doc.text("Ticket Details", 10, y); y += 10;
        doc.text("NR TRAVELS", 10, y); y += 10;
        doc.text(`Date of Journey: ${ticket.date_of_journey}`, 10, y); y += 10;
        doc.text(`PNR: ${ticket.pnr_code}`, 10, y); y += 10;
        doc.text(`Ticket No: ${ticket.unique_ticket_no}`, 10, y); y += 10;
        doc.text(`From: ${ticket.origin}`, 10, y); y += 10;
        doc.text(`To: ${ticket.destination}`, 10, y); y += 10;
        doc.text(`Departure: ${ticket.departure_time}`, 10, y); y += 10;
        doc.text(`Bus Type: ${ticket.bus_type}`, 10, y); y += 10;
        doc.text(`Bus No: ${ticket.plate_no}`, 10, y); y += 10;
        doc.text(`Operator: ${ticket.operator_name}`, 10, y); y += 10;
        doc.text(`Fare: ₹${ticket.total_fare}`, 10, y); y += 10;
        doc.text(`Payment: ${ticket.payment_status}`, 10, y); y += 10;
        doc.text(`Driver 1: ${ticket.driver_name} (${ticket.driver_number})`, 10, y); y += 10;
        doc.text(`Driver 2: ${ticket.driver_two_name} (${ticket.driver_two_number})`, 10, y); y += 15;

        doc.text("Passengers:", 10, y);
        y += 10;

        const passengerLines = seatData
            .filter(seat => seat.pnr_code === ticket.pnr_code)
            .map(seat => `Seat ${seat.seat_no} (${seat.seat_type}) - ${seat.name}`);

        passengerLines.forEach(line => {
            doc.text(line, 10, y);
            y += 10;
        });

        doc.save(`ticket_${ticket.unique_ticket_no}.pdf`);
    };

 

    return (
        <div className="ticket-container">
         
            <h2 className="ticket-title">{`Welcome ${name || ''} - `}Find the Ticket Details</h2>
            <div className="ticket-list">
                <h3 className="breadcrumb" style={{ cursor: 'pointer', textDecoration: 'underline',}} onClick={handleGoHome}>← Go Home</h3>
                {tickets.map(ticket => (
            
                    <div key={ticket.id} className="ticket-card bus-ticket">
                    <p><span className="bt-label">Date of Journey:</span> {ticket.date_of_journey}</p>
                    <div className="bt-main">
                        <img src='https://nrbuss.com/assets/logo1-CSrs-mow.png' style={{height:'45px', width:'60px', borderRadius:'10px'}}></img>   
                        <p><span className="bt-label">PNR:</span> {ticket.pnr_code}</p>
                        <p><span className="bt-label">Ticket No:</span> {ticket.unique_ticket_no}</p>
                        <p><span className="bt-label">From:</span> {ticket.origin}</p>
                        <p><span className="bt-label">To:</span> {ticket.destination}</p>
                       
                        <p><span className="bt-label">Departure:</span> {ticket.departure_time}</p>
                        <p><span className="bt-label">Bus Type:</span> {ticket.bus_type}</p>
                        <p><span className="bt-label">Bus No:</span> {ticket.plate_no}</p>
                        <p><span className="bt-label">Operator:</span> {ticket.operator_name}</p>
                        <p><span className="bt-label">Fare:</span> ₹{ticket.total_fare}</p>
                        <p><span className="bt-label">Payment:</span> {ticket.payment_status}</p>
                        <p><span className="bt-label">Driver 1:</span> {ticket.driver_name} ({ticket.driver_number})</p>
                        <p><span className="bt-label">Driver 2:</span> {ticket.driver_two_name} ({ticket.driver_two_number})</p>
                    </div>
                    <div className="bt-info">
                        <p><strong>Seat Information:</strong></p>
                        {seatData
                        .filter(seat => seat.pnr_code === ticket.pnr_code)
                        .map((seat, index) => (
                            <p key={index}>
                            <span className="bt-label">Seat:</span> {seat.seat_no} ({seat.seat_type}) - {seat.name}
                            </p>
                        ))
                        }
                    </div>
                        
                    <div>
                        <button className='btn btn-outline-primary mt-4 mx-3' onClick={() => handleDownload(ticket)}>Download Ticket</button>
                        <button className='btn btn-outline-primary mt-4 mx-3' onClick={() => handleWhatsApp(ticket)}>What'sApp Me</button>
                    </div>   
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TicketList;
