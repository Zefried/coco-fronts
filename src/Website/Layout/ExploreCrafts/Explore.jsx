
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreCategories.css';


const ExploreCrafts = () => {
  const navigate = useNavigate();
  const categories = [
    { 
      title: 'SERVEWARE', 
      img: 'https://i.pinimg.com/736x/ee/aa/02/eeaa0244e99f24265a6eaf273d2867f8.jpg' 
    },
    { 
      title: 'DINNERWARE', 
      img: 'https://i.pinimg.com/736x/55/ef/c0/55efc0a19d2fce9ec3d4afceb106972b.jpg' 
    },
    { 
      title: 'DRINKWARE', 
      img: 'https://i.pinimg.com/736x/9b/d7/77/9bd777d627d01deff60a5e8dcfb17776.jpg' 
    },
    { 
      title: 'SPECIAL EDITION', 
      img: 'https://i.pinimg.com/736x/f3/02/46/f302468d403b69e2842e5ba591222775.jpg' 
    }
  ];

  const FixCatNavigation = (category) => {
    const urlCategory = category.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${urlCategory}`, { state: { title: category.title} });
  };

  return (
    <section className="explore-crafts">
      <div className="crafts-container">
        <div className="crafts-header">
          <h2 className="crafts-title">EXPLORE CATEGORIES</h2>
          <p className="crafts-subtitle">Discover the artistry behind each piece</p>
        </div>
        

        <div className="crafts-grid">
          {categories.map((category, index) => (
            <div
              className="craft-item clickable"
              key={index}
              onClick={() => FixCatNavigation(category)}
              style={{ cursor: 'pointer' }}
            >
              <div className="craft-image">
                <img 
                  src={category.img}  
                  alt={category.title} 
                  className="craft-img"
                  loading="lazy" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available'
                  }}
                />
              </div>
              <h3 className="craft-name">{category.title}</h3>
            </div>
          ))}
        </div>
        
        <button className="view-all-btn">ABOUT SunClay</button>
      </div>
    </section>
  );
};

export default ExploreCrafts;