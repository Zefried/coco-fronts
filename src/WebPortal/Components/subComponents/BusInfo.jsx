import React, { useState } from "react";
import Bus1 from "../../assets/img/bus1.jpg";

const BusInfo = ({ from, to }) => {
  const images = [Bus1, Bus1, Bus1, Bus1, Bus1, Bus1, Bus1];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="bus-info">
        <div className="bus-name">
          <p className="bus-title">
            <strong>Volvo Transport</strong>
          </p>
          <p>
            {from} - {to}
          </p>
          <p>20:35 - 06:15 · Sun 01 Jun</p>
          <p>A/C Seater / Sleeper (2+1)</p>
        </div>
        <div className="bus-rating2">
          <div className="bus-rating-box">
            <i class="fa-solid fa-star"></i>
            <p>4.4</p>
          </div>
          <div className="bus-rating-count">102</div>
        </div>
      </div>

      <div className="bus-img-slider">
        <button className="nav-button prev" onClick={prevSlide}>
          &#8249;
        </button>
        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {images.map((img, index) => (
              <div className="slide" key={index}>
                <img src={img} alt={`Bus ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="nav-button next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
    </>
  );
};

export default BusInfo;
