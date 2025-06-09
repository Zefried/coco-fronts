import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import slider from "../../assets/img/slider.jpg";
import BookingCalendar from "./BookingCalender";


const locations = [
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
  "Guwahati",
];


function HomeContent() {
  const navigate = useNavigate();

  const [fromSearch, setFromSearch] = useState();
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSearch, setToSearch] = useState();
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleFromChange = (e) => {
    const input = e.target.value;
    setFromSearch(input);

    const filtered = locations.filter((location) =>
      location.toLowerCase().startsWith(input.toLowerCase())
    );

    setFromSuggestions(input.length > 0 ? filtered : []);
  };

  const handleFromSuggestionClick = (suggestion) => {
    setFromSearch(suggestion);
    setFromSuggestions([]);
  };

  const handleToChange = (e) => {
    const input = e.target.value;
    setToSearch(input);

    const filtered = locations.filter((location) =>
      location.toLowerCase().startsWith(input.toLowerCase())
    );

    setToSuggestions(input.length > 0 ? filtered : []);
  };

  const handleToSuggestionClick = (suggestion) => {
    setToSearch(suggestion);
    setToSuggestions([]);
  };

  const handleSearch = () => {
    if (!fromSearch || !toSearch || !selectedDate) {
      alert("Please fill 'From', 'To', and 'Date' fields");
      return;
    }

    navigate("/search", {
      state: {
        from: fromSearch,
        to: toSearch,
        date: format(selectedDate, "dd/MM/yyyy"),
      },
    });
  };

  return (
    <>
      <section className="slider-section">
        <div className="slider-img">
          <img src={slider} alt="" />
        </div>
        <div className="slider-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="slider-head-text text-center">
                  <h2>Assam's No. 1 Online Bus Ticket Booking Site</h2>
                </div>
                <div className="slider-search">
                  {/* From input */}
                  <div className="from-input" style={{ position: "relative" }}>
                    <div className="from-icon">
                      <i className="fa-solid fa-bus-simple"></i>
                      <label htmlFor="from">From</label>
                    </div>
                    <input
                      className="input-no-border"
                      type="text"
                      placeholder="Search a Location..."
                      value={fromSearch}
                      onChange={handleFromChange}
                    />
                    {fromSuggestions.length > 0 && (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          marginTop: 5,
                          position: "absolute",
                          width: "280px",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          borderRadius: "6px",
                          zIndex: 999,
                        }}
                      >
                        {fromSuggestions.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleFromSuggestionClick(item)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom:
                                index !== fromSuggestions.length - 1
                                  ? "1px solid #eee"
                                  : "none",
                              transition: "background 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = "#f2f2f2")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = "#fff")
                            }
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* To input */}
                  <div className="from-input" style={{ position: "relative" }}>
                    <div className="from-icon">
                      <i className="fa-solid fa-bus-simple"></i>
                      <label htmlFor="to">To</label>
                    </div>
                    <input
                      className="input-no-border"
                      type="text"
                      placeholder="Enter destination..."
                      value={toSearch}
                      onChange={handleToChange}
                    />
                    {toSuggestions.length > 0 && (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          marginTop: 5,
                          position: "absolute",
                          width: "280px",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          borderRadius: "6px",
                          zIndex: 999,
                        }}
                      >
                        {toSuggestions.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleToSuggestionClick(item)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom:
                                index !== toSuggestions.length - 1
                                  ? "1px solid #eee"
                                  : "none",
                              transition: "background 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = "#f2f2f2")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = "#fff")
                            }
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>  

                  {/* Date Picker */}
                  <div className="from-input">
                    <div className="from-icon">
                      <i className="fa-solid fa-calendar-days"></i>
                      <label htmlFor="date">Date</label>
                    </div>
                    <BookingCalendar setSelectedDate={setSelectedDate} />
                  </div>

                  {/* Search Button */}
                  <div className="from-btn">
                    <a href="">
                      <button button onClick={handleSearch}>
                        Search Buses
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeContent;
