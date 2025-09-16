import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FullInfo.css';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import { useDarkMode } from '../../../Layout/Darkmood/Darkmood';

const FullInfo = () => {
    const { token } = AuthAction.getState('sunState');
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useDarkMode();

    // Editing states
    const [editingImageId, setEditingImageId] = useState(null);
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/product/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProduct(res.data.data);
                setDraftValues(res.data.data); // initialize draft values
            } catch (err) {
                console.error('Failed to fetch product details', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId, token]);

    const handleImageChange = async (e, imageId) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`/api/admin/product/image/${imageId}`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            setProduct({
                ...product,
                images: product.images.map(img =>
                    img.id === imageId ? { ...img, image: res.data.data.image } : img
                )
            });
            setEditingImageId(null);
        } catch (err) {
            console.error('Failed to update image', err);
        }
    };

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const res = await axios.post(`/api/admin/product/update/${productId}`, draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProduct(draftValues);
            alert('Product updated successfully');
        } catch (err) {
            console.error('Failed to update product', err);
            alert('Update failed');
        }
    };

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

    const renderEditableField = (label, field, type = 'text', suffix = '') => (
        <div className="detail-item">
            <span className="detail-label">{label}</span>
            {editingField === field ? (
                <input
                    type={type}
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <span className="detail-value">
                    {draftValues[field] || 'N/A'}{suffix}
                    <button style={{ marginLeft: '5px', border: 'none' }} onClick={() => setEditingField(field)}>🖊</button>
                </span>
            )}
        </div>
    );

    return (
        <div className={`product-full-info-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2>{product.name}</h2>

            <div className="product-gallery">
                {product.images?.map(img => (
                    <div key={img.id} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                        <img
                            src={`https://backendsunclaystudio.space/images/${img.image}`}
                            alt={product.name}
                            className="product-gallery-img"
                        />
                        <button
                            style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                            onClick={() => setEditingImageId(img.id)}
                        >
                            🖊
                        </button>
                        {editingImageId === img.id && (
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageChange(e, img.id)}
                                ref={input => input && input.click()}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="product-full-details">
                <div className="detail-section">
                    <h3>Product Information</h3>
                    <div className="detail-grid">
                        {renderEditableField('Description', 'description')}
                        {renderEditableField('Clay Type', 'clay_type')}
                        {renderEditableField('Firing Method', 'firing_method')}
                        {renderEditableField('Glaze Type', 'glaze_type')}
                        {renderEditableField('Dimensions', 'dimensions')}
                        {renderEditableField('Weight', 'weight', 'number', 'g')}
                        {renderEditableField('Color', 'color')}
                        {renderEditableField('best_seller', 'best_seller')}

                        {renderEditableField('YouTube Video', 'youtube_link')}
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Inventory</h3>
                    <div className="detail-grid">
                        {renderEditableField('Stock Quantity', 'stock_quantity', 'number')}
                        {renderEditableField('Price', 'price', 'number')}
                    </div>
                </div>

                <div className="price-section">
                    <div className="price-row">
                        {product.discount_percent > 0 && (
                            <>
                                <span className="original-price">₹{draftValues.price}</span>
                                <span className="discounted-price">₹{Math.round(draftValues.price * (1 - product.discount_percent / 100))}</span>
                                <span className="discount-badge">{product.discount_percent}% OFF</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Attributes</h3>
                    <div>
                        {draftValues.is_fragile && <span className="attribute-badge fragile-badge">Fragile</span>}
                        {draftValues.is_handmade && <span className="attribute-badge handmade-badge">Handmade</span>}
                    </div>
                </div>

                <button style={{ marginTop: '20px', padding: '8px 15px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default FullInfo;
