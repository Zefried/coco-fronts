import React from "react";
import Header from "./layouts/header";
import SelectSeat from "./subComponents/SelectSeat";
import SeatSelectInfo from "./subComponents/SeatSelectInfo";
import BoardingSelect from "./subComponents/BoardingSelect";
import BusInfo from "./subComponents/BusInfo";
import Procees from "./Procees";

const ViewSeat = ({ from, to, date, onClose }) => {
  return (
    <div className="seat-popup-overlay">
      <div className="seat-popup-content">
        <button className="close-btn" onClick={onClose}>×</button>


        <div className="seat-selection">
            <div className="row">
              <div className="col-lg-6">
                <SelectSeat />
              </div>
              <div className="col-lg-6">
                <BusInfo from={from} to={to} date={date}></BusInfo>
                <SeatSelectInfo />
                <BoardingSelect />
              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default ViewSeat;
