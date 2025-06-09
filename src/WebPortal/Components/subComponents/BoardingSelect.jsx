import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardingSelect = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("boarding");
  const [selectedDropping, setSelectedDropping] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "boarding") {
      setSelectedDropping(null);
    }
  };

  const handleDroppingChange = (e) => {
    setSelectedDropping(e.target.value);
  };

  const isContinueActive = activeTab === "dropping" && selectedDropping;

  return (
    <div className="point-select">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "boarding" ? "active" : ""}`}
          onClick={() => handleTabClick("boarding")}
        >
          BOARDING POINT
        </div>
        <div
          className={`tab ${activeTab === "dropping" ? "active" : ""}`}
          onClick={() => handleTabClick("dropping")}
        >
          DROPPING POINT
        </div>
      </div>

      {/* Boarding Section */}
      <div
        className={`points-list ${activeTab === "boarding" ? "active" : ""}`}
      >
        <div className="point">
          <input type="radio" name="boarding" id="boarding1" />
          <label htmlFor="boarding1">21:15 Beltola Charali</label>
        </div>
        <div className="point">
          <input type="radio" name="boarding" id="boarding2" />
          <label htmlFor="boarding2">
            21:30 Khanapara
            <br />
            <span>Near Khanapara GMC Toilet</span>
          </label>
        </div>
      </div>

      {/* Dropping Section */}
      <div
        className={`points-list ${activeTab === "dropping" ? "active" : ""}`}
      >
        <div className="note">*This bus has a single dropping point</div>
        <div className="point">
          <input
            type="radio"
            name="dropping"
            id="dropping1"
            value="dropping1"
            onChange={handleDroppingChange}
            checked={selectedDropping === "dropping1"}
          />
          <label htmlFor="dropping1">
            06:30 (17 May) Dibrugarh
            <br />
            <span>Chowk - Dibrugarh TC Bus Stop</span>
          </label>
        </div>
      </div>

      {/* Amount and Continue */}
      <div className="amount">
        <span>AMOUNT: INR 700.00</span>
        <button
          id="continueBtn"
          className={`continue-btn ${isContinueActive ? "active" : ""}`}
          disabled={!isContinueActive}
        >
          {/* <Link>Continue</Link> */}
          <a onClick={() => navigate('/final')}>CONTINUE</a>
        </button>
      </div>

      <div style={{ fontSize: "0.9rem", color: "#666", textAlign: "left" }}>
        [ Taxes will be calculated during payment ]
      </div>
    </div>
  );
};

export default BoardingSelect;
