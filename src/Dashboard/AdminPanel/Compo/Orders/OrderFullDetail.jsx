import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './OrderFullDetail.css';

const OrderFullDetail = ({ id }) => {
    const { token } = AuthAction.getState('sunState');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFullinfo = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/admin/orders/info/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrderData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFullinfo();
    }, [id, token]);

    if (loading) {
        return <div className="order-detail-loading">Loading order details...</div>;
    }

    if (!orderData || !orderData.data) {
        return <div className="order-detail-error">Order information not available</div>;
    }

    const { order, user, products } = orderData.data;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(price);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'paid': return 'status-paid';
            case 'pending': return 'status-pending';
            case 'failed': return 'status-failed';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-default';
        }
    };

    return (
        <div className="order-detail-container">
            <div className="order-detail-header">
                <h2 className="order-detail-title">Order Details</h2>
                <div className="order-detail-id">Order #{order.id}</div>
            </div>

            <div className="order-detail-content">
                <div className="order-info-section">
                    <h3 className="section-title">Order Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-label">Order Date</div>
                            <div className="info-value">{formatDate(order.order_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Payment ID</div>
                            <div className="info-value">{order.payment_id}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Payment Status</div>
                            <div className={`info-value status-badge ${getStatusClass(order.payment_status)}`}>
                                {order.payment_status}
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Delivery Status</div>
                            <div className={`info-value status-badge ${getStatusClass(order.delivery_status)}`}>
                                {order.delivery_status}
                            </div>
                        </div>
                    </div>

                    <div className="address-section">
                        <h4 className="subsection-title">Shipping Address</h4>
                        <div className="address-content">
                            <p>{order.address}</p>
                            <p>Pin: {order.pin}</p>
                        </div>
                    </div>

                    {order.coupon_code && (
                        <div className="coupon-section">
                            <h4 className="subsection-title">Coupon Applied</h4>
                            <div className="coupon-content">
                                <p>Code: {order.coupon_code}</p>
                                <p>Discount: {order.coupon_discount}%</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="products-section">
                    <h3 className="section-title">Products in this Order</h3>
                    <div className="products-list">
                        {products.map((product) => {
                            const orderProduct = JSON.parse(order.products).find(p => p.product_id === product.id);
                            const price = orderProduct ? parseFloat(orderProduct.unit_price) : 0;

                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-images">
                                        {product.images && product.images.length > 0 ? (
                                            product.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={`https://backendsunclaystudio.space/images/${img.image}`}
                                                    alt={product.name}
                                                    className="product-image"
                                                />
                                            ))
                                        ) : (
                                            <div className="product-no-image">No Image</div>
                                        )}
                                    </div>
                                    <div className="product-details">
                                        <h4 className="product-name">{product.name}</h4>
                                        <div className="product-info">
                                            <div className="product-info-item">
                                                <span className="info-label">Price:</span>
                                                <span className="info-value">{formatPrice(price)}</span>
                                            </div>
                                            <div className="product-info-item">
                                                <span className="info-label">Quantity:</span>
                                                <span className="info-value">{product.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );  
                        
                        })}
                          <div className="order-info-section">
                                    <h3 className="section-title">User Information</h3>
                                        <div className="info-grid">
                                            <div className="info-item">
                                            <div className="info-label">Name</div>
                                            <div className="info-value">{user.name}</div>
                                            </div>
                                            <div className="info-item">
                                            <div className="info-label">Email</div>
                                            <div className="info-value">{user.email}</div>
                                            </div>
                                            <div className="info-item">
                                            <div className="info-label">Phone</div>
                                            <div className="info-value">{user.phone || 'N/A'}</div>
                                            </div>
                                        </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFullDetail;
