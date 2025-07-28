import React, { useState, useEffect } from 'react';
import './HeroSlider.css';
import Header from '../Header/Header';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "LANES & LEGACIES",
      subtitle: "Bringing the artistry of the aigra home",
      collection: "NEW COLLECTION",
      buttonText: "SHOP NOW",
      backgroundImage: "https://cdn.shopify.com/s/files/1/0523/2122/2816/files/New_collection_-Desktop_2.jpg?v=1740386707"
    },
    {
      id: 2,
      title: "TIMELESS ELEGANCE",
      subtitle: "Crafting spaces that tell your story",
      collection: "BEST SELLERS",
      buttonText: "EXPLORE",
      backgroundImage: "https://cdn.shopify.com/s/files/1/0523/2122/2816/files/New_collection_-Desktop_2.jpg?v=1740386707"
    },
    {
      id: 3,
      title: "MODERN HERITAGE",
      subtitle: "Where tradition meets contemporary design",
      collection: "LIMITED EDITION",
      buttonText: "DISCOVER",
      backgroundImage: "https://cdn.shopify.com/s/files/1/0523/2122/2816/files/New_collection_-Desktop_4_03914d0b-f118-4ee3-8518-2a96db0a3c71.jpg?v=1740457975"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
    <Header/>
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.backgroundImage})` }}
        >
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <div className="collection-tag">{slide.collection}</div>
            <button className="shop-button">{slide.buttonText}</button>
          </div>
        </div>
      ))}
      
      <div className="slider-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`control-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
    </>
  
  );
};

export default HeroSlider;