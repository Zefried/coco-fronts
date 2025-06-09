import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  "West Karbi Anglong"
];

function SearchTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    from: initialFrom,
    to: initialTo,
    date: initialDate,
  } = location.state || {};

  const [from, setFrom] = useState(initialFrom || "");
  const [to, setTo] = useState(initialTo || "");
  const [date, setDate] = useState(initialDate || "");
  const [isEditing, setIsEditing] = useState(false);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().startsWith(value.toLowerCase())
    );
    setFromSuggestions(value ? filtered : []);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().startsWith(value.toLowerCase())
    );
    setToSuggestions(value ? filtered : []);
  };

  const handleFromSuggestionClick = (suggestion) => {
    setFrom(suggestion);
    setFromSuggestions([]);
  };

  const handleToSuggestionClick = (suggestion) => {
    setTo(suggestion);
    setToSuggestions([]);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    navigate("/search", {
      state: { from, to, date },
    });
  };

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="search-section">
      <div className="modify-section">
        <div className="modi-from">
          {isEditing ? (
            <div>
              <input value={from} onChange={handleFromChange} placeholder="From" />
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {fromSuggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleFromSuggestionClick(item)}
                    style={{
                      padding: "6px",
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>{from}</h2>
          )}
        </div>

        <div className="arrow-icon">
          <i className="fa-solid fa-arrow-right"></i>
        </div>

        <div className="modi-to">
          {isEditing ? (
            <div>
              <input value={to} onChange={handleToChange} placeholder="To" />
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {toSuggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleToSuggestionClick(item)}
                    style={{
                      padding: "6px",
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>{to}</h2>
          )}
        </div>

        <div className="modi-date">
          {isEditing ? (
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          ) : (
            <h2>{date}</h2>
          )}
        </div>

        <div className="modi-btn">
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleModifyClick}>Modify</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchTop;
