import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingCalendar({ setSelectedDate }) {
  const [localDate, setLocalDate] = useState(null); 
  const handleDateChange = (date) => {
    setLocalDate(date);
    setSelectedDate(date); 
  };

  const today = new Date();

  return (
    <div>
      <DatePicker
        selected={localDate}
        onChange={handleDateChange}
        minDate={today}
        placeholderText="Choose a date"
        dateFormat="dd/MM/yyyy"
        className="date-picker input-no-border"
      />
    </div>
  );
}

export default BookingCalendar;
