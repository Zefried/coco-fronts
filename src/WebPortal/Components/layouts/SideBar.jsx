import React from "react";
import './global.css';

function SideBar() {
  return (
    <>
      <div class="filter-section">
        <h4>Filter</h4>
        <hr class="filter-hr" />
        <div class="filter-items">
          <i class="fa-solid fa-star-half-stroke"></i>
          <p>Primo Bus</p>
        </div>
        <hr class="filter-hr" />
        <div class="filter-items">
          <i class="fa-regular fa-face-surprise"></i>
          <p>Special Price</p>
        </div>
        <hr class="filter-hr" />
      </div>

      <div class="bus-type-section">
        <h4>Bus Types</h4>
        <div class="bus-type-items">
          <input type="checkbox" />
          <p>Seater</p>
        </div>
        <div class="bus-type-items">
          <input type="checkbox" />
          <p>Sleeper</p>
        </div>
        <div class="bus-type-items">
          <input type="checkbox" />
          <p>AC</p>
        </div>
        <div class="bus-type-items">
          <input type="checkbox" />
          <p>Non AC</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
