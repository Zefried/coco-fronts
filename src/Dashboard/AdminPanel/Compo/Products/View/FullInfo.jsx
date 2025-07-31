import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FullInfo.css';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import { useDarkMode } from '../../../Layout/Darkmood/Darkmood';

const FullInfo = () => {
    const {token} = AuthAction.getState('sunState');
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useDarkMode();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/product/${productId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(res.data.data);
            } catch (err) {
                console.error('Failed to fetch product details', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId, token]);
    
    if (loading) {
        return (
            <div className={`full-info-loader ${isDarkMode ? 'dark-mode' : ''}`}>
                <span className="loading-spinner"></span> 
                <span>Loading product details...</span>
            </div>
        );
    }
    
    if (!product) {
        return (
            <div className={`product-full-info-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="full-info-empty-state">Product not found.</div>
            </div>
        );
    }
    
    return (
        <div className={`product-full-info-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2>{product.name}</h2>
            
            <div className="product-gallery">
                {product.images?.map(img => (
                    <img
                        key={img.id}
                        src={`http://127.0.0.1:8000/images/${img.image}`}
                        alt={product.name}
                        className="product-gallery-img"
                    />
                ))}
            </div>
            
            <div className="product-full-details">
                <div className="detail-section">
                    <h3>Product Information</h3>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">Description</span>
                            <span className="detail-value description-text">{product.description || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Clay Type</span>
                            <span className="detail-value">{product.clay_type || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Firing Method</span>
                            <span className="detail-value">{product.firing_method || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Glaze Type</span>
                            <span className="detail-value">{product.glaze_type || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Dimensions</span>
                            <span className="detail-value">{product.dimensions || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Weight</span>
                            <span className="detail-value">{product.weight ? `${product.weight}g` : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                
                <div className="detail-section">
                    <h3>Inventory</h3>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">Stock Quantity</span>
                            <span className="detail-value">{product.stock_quantity || 0}</span>
                        </div>
                    </div>
                </div>
                
                <div className="price-section">
                    <div className="price-row">
                        <span className="detail-label">Price</span>
                        {product.discount_percent > 0 ? (
                            <div>
                                <span className="original-price">₹{product.price}</span>
                                <span className="discounted-price">
                                    ₹{Math.round(product.price * (1 - product.discount_percent/100))}
                                </span>
                                <span className="discount-badge">{product.discount_percent}% OFF</span>
                            </div>
                        ) : (
                            <span className="discounted-price">₹{product.price}</span>
                        )}
                    </div>
                </div>
                
                <div className="detail-section">
                    <h3>Attributes</h3>
                    <div>
                        {product.is_fragile && (
                            <span className="attribute-badge fragile-badge">Fragile</span>
                        )}
                        {product.is_handmade && (
                            <span className="attribute-badge handmade-badge">Handmade</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullInfo;