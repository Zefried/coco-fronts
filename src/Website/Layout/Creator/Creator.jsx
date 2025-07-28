import React from 'react';
import './CreatorSection.css';

const CreatorsSection = () => {
  // Single creator data
  const creator = {
    name: "CoCo",
    role: "ceramic artists",
    videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
    thumbnail: "https://i.pinimg.com/736x/28/c3/f4/28c3f48a9ab00285af2abd7ae505c7f8.jpg",
    description: "Each piece in our collection is a testament to the skill and dedication of master artisans."
  };

  return (
    <section className="creators-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">THE ARTISAN'S TOUCH</h2>
          <p className="section-subtitle">{creator.description}</p>
        </div>

        <div className="video-wrapper">
          <div className="video-container">
            <a 
              href={`https://www.youtube.com/watch?v=${creator.videoId}`} 
              className="video-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={creator.thumbnail} 
                alt={creator.name} 
                className="video-thumbnail"
              />
              <div className="play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
              </div>
            </a>
          </div>
          <div className="creator-info">
            <h3 className="creator-name">{creator.name}</h3>
            <p className="creator-role">{creator.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;