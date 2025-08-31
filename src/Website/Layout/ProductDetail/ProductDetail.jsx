import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileBottomNav from '../MobileNav/MobileNav';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const thumbnailListRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/product/${productId}`);
        setProduct(res.data.data);
        setSelectedImage(0);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const calculateDiscountedPrice = () => {
    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount_percent) / 100;
    return (price - (price * discount)).toFixed(2);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock_quantity) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Add to cart handler
  const addToCart = (productId, quantity) => {
    const fullState = AuthAction.getState('sunState');
    const currentCart = Array.isArray(fullState.guestCart) ? fullState.guestCart : [];

    const updatedCart = [...currentCart];
    const index = updatedCart.findIndex(item => item.product_id === productId);

    if (index !== -1) {
      updatedCart[index].quantity += quantity;
    } else {
      updatedCart.push({ product_id: productId, quantity });
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

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Image carousel navigation
  const nextImage = () => {
    if (product.images && selectedImage < product.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else if (product.images) {
      setSelectedImage(0);
    }
  };

  const prevImage = () => {
    if (product.images && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else if (product.images) {
      setSelectedImage(product.images.length - 1);
    }
  };

  // Touch and drag events for thumbnails
  const handleThumbnailMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - thumbnailListRef.current.offsetLeft);
    setScrollLeft(thumbnailListRef.current.scrollLeft);
  };

  const handleThumbnailMouseLeave = () => {
    setIsDragging(false);
  };

  const handleThumbnailMouseUp = () => {
    setIsDragging(false);
  };

  const handleThumbnailMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - thumbnailListRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailListRef.current.scrollLeft = scrollLeft - walk;
  };

  if (loading) return (
    <div className="product-detail">
      <Header />
      <div className="loading-spinner">Loading product details...</div>
    </div>
  );
  
  if (error) return (
    <div className="product-detail">
      <Header />
      <div className="error-message">{error}</div>
    </div>
  );
  
  if (!product) return (
    <div className="product-detail">
      <Header />
      <div className="not-found">Product not found.</div>
    </div>
  );

  const discountedPrice = calculateDiscountedPrice();

  const videoId = product.youtube_link.includes("v=") 
    ? product.youtube_link.split("v=")[1] 
    : product.youtube_link;

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  console.log('YouTube Video URL:', videoUrl);

  return (
    <>
      <Header />

      {showCartAlert && (
        <div className="cart-alert">
          <div className="cart-alert-content">
            <span>Added to Cart</span>
          </div>
        </div>
      )}

      <div className="product-detail">
        <div className="product-container">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              {product.images?.[selectedImage]?.image ? (
                <>
                  <img
                    src={`http://127.0.0.1:8000/images/${product.images[selectedImage].image}`}
                    alt={product.name}
                  />
                  {product.images.length > 1 && (
                    <>
                      <button className="nav-btn prev-btn" onClick={prevImage}>
                        &lt;
                      </button>
                      <button className="nav-btn next-btn" onClick={nextImage}>
                        &gt;
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="image-placeholder">No Image Available</div>
              )}
            </div>
            
            {product.images?.length > 1 && (
              <>
                <div className="gallery-pagination">
                  {product.images?.map((_, index) => (
                    <div 
                      key={index}
                      className={`pagination-dot ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
                
                <div 
                  className="thumbnail-list"
                  ref={thumbnailListRef}
                  onMouseDown={handleThumbnailMouseDown}
                  onMouseLeave={handleThumbnailMouseLeave}
                  onMouseUp={handleThumbnailMouseUp}
                  onMouseMove={handleThumbnailMouseMove}
                >
                  {product.images?.map((image, index) => (
                    <div 
                      key={image.id} 
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={`http://127.0.0.1:8000/images/${image.image}`} 
                        alt={`${product.name} - ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-name-wrap">
                <h1 className="product-name">{product.name}</h1>
                <div className="product-subtitle">Handcrafted Ceramic Collection</div>
              </div>
              
              <div className="product-price">
                {product.discount_percent > 0 ? (
                  <>
                    <span className="original-price">₹{product.price}</span>
                    <span className="discounted-price">₹{discountedPrice}</span>
                    <span className="discount-badge">Save {product.discount_percent}%</span>
                  </>
                ) : (
                  <span className="current-price">₹{product.price}</span>
                )}
              </div>

              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className={`meta-value ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Clay Type:</span>
                  <span className="meta-value">{product.clay_type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Firing Method:</span>
                  <span className="meta-value">{product.firing_method}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Glaze Type:</span>
                  <span className="meta-value">{product.glaze_type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Dimensions:</span>
                  <span className="meta-value">{product.dimensions}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Weight:</span>
                  <span className="meta-value">{product.weight}g</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Handmade:</span>
                  <span className="meta-value">{product.is_handmade ? 'Yes' : 'No'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Fragile:</span>
                  <span className="meta-value">{product.is_fragile ? 'Handle with care' : 'Standard'}</span>
                </div>
              </div>

              {product.stock_quantity > 0 && (
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                    <input 
                      type="number" 
                      min="1" 
                      max={product.stock_quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product.id, quantity)}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>


            <div className="product-description">
              <h3>Product Details</h3>
              <p>{product.description}</p>
              <div className="fr-video-wrapper">
                <iframe 
                  className="responsive-iframe"
                  src={videoUrl} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
      <MobileBottomNav/>
    </>
  );
};

export default ProductDetail;