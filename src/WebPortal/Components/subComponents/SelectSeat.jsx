import React from "react";

import SeatImg from '../../assets/img/lower.png'
import SeatImg2 from '../../assets/img/upper.png'

const SelectSeat = () => {
  return (
    <div>
      <div class="deck-section">
        <p>Lower Deck</p>
        <img src={SeatImg} alt="" />
        <p>Upper Deck</p>
        <img src={SeatImg2} alt="" />
      </div>
    </div>
  );
};

export default SelectSeat;
