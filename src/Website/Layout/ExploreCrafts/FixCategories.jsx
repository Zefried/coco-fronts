import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import './FixCat.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import MobileBottomNav from '../MobileNav/MobileNav';

const FixCategories = () => {
  const { title } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showCartAlert, setShowCartAlert] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoryTitle = location.state?.title || title;
        const res = await axios.post('/api/fetch-products/static-categories', {
          category_title: categoryTitle
        });
        setProducts(res.data.data || []);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [title, location.state]);

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  // Add to cart handler
  const addToCart = (productId, e) => {
    e.stopPropagation();
    
    const fullState = AuthAction.getState('sunState');
    const currentCart = Array.isArray(fullState.guestCart) ? fullState.guestCart : [];

    const updatedCart = [...currentCart];
    const index = updatedCart.findIndex(item => item.product_id === productId);

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ product_id: productId, quantity: 1 });
    }

    AuthAction.updateState({ guestCart: updatedCart });

    // Dispatch custom event to notify cart count change
    const event = new CustomEvent('cartCountUpdated', { 
      detail: { count: updatedCart.length }
    });
    window.dispatchEvent(event);
    
    // Show alert
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 3000);
  };

  if (loading) return (
    <div className="fix-categories-loading">
      <div className="fix-categories-spinner"></div>
      <p>Loading products...</p>
    </div>
  );
  
  if (error) return <div className="fix-categories-error">{error}</div>;

  return (
    <div className="fix-categories-container">
      <Header /> 
      
      {showCartAlert && (
        <div className="cart-alert">
          <div className="cart-alert-content">
            <span>Added to Cart</span>
          </div>
        </div>
      )}
      
      <div className="fix-categories-header">
        <h1 className="fix-categories-title">{title.replace(/-/g, ' ').toUpperCase()}</h1>
        <p className="fix-categories-count">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
      </div>
      
      {products.length === 0 ? (
        <div className="fix-categories-empty">
          <p>No products found for this category.</p>
        </div>
      ) : (
        <div className="fix-categories-grid">
          {products.map(product => (
            <div
              className="fix-categories-card clickable"
              key={product.id}
              onClick={() => navigate(`/product-detail/${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="fix-categories-image-container">
                {product.images?.[0]?.image ? (
                  <img
                    src={`http://127.0.0.1:8000/images/${product.images[0].image}`}
                    alt={product.name}
                    className="fix-categories-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="fix-categories-image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
                {product.discount_percent > 0 && (
                  <span className="fix-categories-discount-badge">-{product.discount_percent}%</span>
                )}
                {product.is_handmade && (
                  <span className="fix-categories-handmade-badge">Handmade</span>
                )}
              </div>
              
              <div className="fix-categories-info">
                <h3 className="fix-categories-name">{product.name}</h3>
                <div className="fix-categories-price-container">
                  {product.discount_percent > 0 ? (
                    <>
                      <span className="fix-categories-original-price">₹{product.price}</span>
                      <span className="fix-categories-discounted-price">
                        ₹{calculateDiscountedPrice(product.price, product.discount_percent)}
                      </span>
                    </>
                  ) : (
                    <span className="fix-categories-price">₹{product.price}</span>
                  )}
                </div>
                
                <div className="fix-categories-meta">
                  <span className="fix-categories-stock">
                    {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                  {product.is_fragile && (
                    <span className="fix-categories-fragile">Fragile</span>
                  )}
                </div>
                
                {product.stock_quantity > 0 && (
                  <button
                    className="fix-categories-add-to-cart"
                    onClick={(e) => addToCart(product.id, e)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <MobileBottomNav/>
    </div>
  );
};

export default FixCategories;