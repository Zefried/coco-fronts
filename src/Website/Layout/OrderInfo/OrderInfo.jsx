import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import Header from '../Header/Header';
import MobileBottomNav from '../MobileNav/MobileNav';
import { FiPackage, FiCalendar, FiCreditCard, FiDollarSign, FiMapPin, FiTag, FiX, FiDownload, FiChevronRight, FiImage } from 'react-icons/fi';
import './OrderInfo.css';

const OrderInfo = () => {
  // Get the user's authentication token
  const { token } = AuthAction.getState('sunState');
  
  // State variables to store our data
  const [orders, setOrders] = useState([]);        // List of orders
  const [selectedOrder, setSelectedOrder] = useState(null);  // Order selected for details
  const [loading, setLoading] = useState(true);    // Loading state
  
  // Base URL for product images
  const IMAGE_BASE_URL = 'https://backendsunclaystudio.space/images/';
  
  // Function to fetch orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make API request to get user orders
        const res = await axios.get('/api/user/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Get the orders from the response
        const fetchedOrders = res.data.data;
        
        // Sort orders by date (newest first)
        const sortedOrders = [...fetchedOrders].sort((a, b) => {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(a.order_date);
          const dateB = new Date(b.order_date);
          
          // Sort in descending order (newest first)
          return dateB - dateA;
        });
        
        // Store the sorted orders in our state
        setOrders(sortedOrders);
      } catch (err) {
        console.error('Error fetching orders', err);
      } finally {
        // Set loading to false when done
        setLoading(false);
      }
    };
    
    // Call the function
    fetchOrders();
  }, [token]);  // Run this effect when token changes
  
  // Function to format dates in a readable way
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Function to get the right CSS class for order status
  const getStatusClass = (status) => {
    if (!status) return 'status-pending';
    
    // Convert to lowercase for comparison
    const s = status.toLowerCase();
    
    // Return the appropriate CSS class based on status
    if (s === 'delivered') return 'status-delivered';
    if (s === 'shipped') return 'status-shipped';
    if (s === 'processing') return 'status-processing';
    if (s === 'cancelled') return 'status-cancelled';
    
    // Default case
    return 'status-pending';
  };
  
  // Function to safely parse product data
  const parseProducts = (products) => {
    try {
      // If products is already an array, return it
      if (Array.isArray(products)) {
        return products;
      }
      
      // If it's a string, try to parse it as JSON
      if (typeof products === 'string') {
        return JSON.parse(products);
      }
      
      // Otherwise return empty array
      return [];
    } catch (err) {
      console.error('Error parsing products:', err);
      return [];
    }
  };
  
  // Function to download invoice as text file
  const handleDownload = (order) => {
    // Create the text content for the invoice
    const text = `
    Order ID: ${order.id}
    Date: ${order.order_date}
    Status: ${order.delivery_status}
    Payment: ${order.payment_status}
    Amount: ${order.payment?.total_amount || '-'}
    Address: ${order.address}, ${order.pin}
    `;
    
    // Create a blob (file-like object) with the text
    const blob = new Blob([text], { type: 'text/plain' });
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_order_${order.id}.txt`;
    
    // Trigger the download
    link.click();
  };
  
  // Main component render
  return (
    <div className="order-container">
      {/* Header component */}
      <Header />
      
      <div className="order-content">
        {/* Page title and description */}
        <div className="order-header">
          <h1 className="order-title">My Orders</h1>
          <p className="order-subtitle">Track and manage your orders</p>
        </div>
        
        {/* Orders list */}
        <div className="orders-list">
          {/* Show loading spinner while fetching data */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            // Show message if no orders found
            <div className="empty-orders">
              <div className="empty-icon"><FiPackage /></div>
              <h2>No orders yet</h2>
              <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          ) : (
            // Show grid of order cards
            <div className="orders-grid">
              {orders.map((order) => (
                // Each order card
                <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
                  {/* Product image at top of card */}
                  <div className="order-image-container">
                    {order.products?.[0]?.images?.[0] ? (
                      <img
                        src={`${IMAGE_BASE_URL}${order.products[0].images[0].image}`}
                        alt={`Product ${order.products[0].product_id}`}
                        className="order-image"
                      />
                    ) : (
                      // Placeholder if no image
                      <div className="order-image-placeholder"><FiImage /></div>
                    )}
                  </div>
                  
                  {/* Order header with ID and status */}
                  <div className="order-header-card">
                    <div className="order-id">
                      <span className="order-label">Order</span>
                      <span className="order-number">#{order.id}</span>
                    </div>
                    <span className={`order-status ${getStatusClass(order.delivery_status)}`}>
                      {`Delivery Status : ${order.delivery_status}`}
                    </span>
                  </div>
                  
                  {/* Order details */}
                  <div className="order-details">
                    <div className="order-detail-item">
                      <FiCalendar className="detail-icon" />
                      <span>{formatDate(order.order_date)}</span>
                    </div>
                    <div className="order-detail-item">
                      <FiDollarSign className="detail-icon" />
                      <span>₹{order.payment?.total_amount || '-'}</span>
                    </div>
                    <div className="order-detail-item">
                      <FiCreditCard className="detail-icon" />
                      <span>{order.payment_status}</span>
                    </div>
                  </div>
                  
                  {/* View details button */}
                  <div className="order-footer">
                    <button className="view-order-btn">
                      View Details <FiChevronRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Order details modal (popup) */}
      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                <FiX />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="modal-content">
              {/* Order summary information */}
              <div className="order-summary">
                <div className="summary-item">
                  <div className="summary-label">Order Number</div>
                  <div className="summary-value">#{selectedOrder.id}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Order Date</div>
                  <div className="summary-value">{formatDate(selectedOrder.order_date)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Delivery Status</div>
                  <div className={`summary-value status ${getStatusClass(selectedOrder.delivery_status)}`}>
                    {selectedOrder.delivery_status}
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Payment Method</div>
                  <div className="summary-value">{selectedOrder.payment?.payment_method || '-'}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Transaction ID</div>
                  <div className="summary-value">{selectedOrder.payment?.transaction_id || '-'}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Total Amount</div>
                  <div className="summary-value amount">₹{selectedOrder.payment?.total_amount || '-'}</div>
                </div>
              </div>
              
              {/* Shipping address section */}
              <div className="order-section">
                <div className="section-title">
                  <FiMapPin />
                  <h3>Shipping Address</h3>
                </div>
                <p>{selectedOrder.address}, {selectedOrder.pin}</p>
              </div>
              
              {/* Coupon section */}
              <div className="order-section">
                <div className="section-title">
                  <FiTag />
                  <h3>Coupon Applied</h3>
                </div>
                <p>{selectedOrder.coupon_code || 'None'}</p>
              </div>
              
              {/* Products section */}
              <div className="order-section">
                <div className="section-title">
                  <FiPackage />
                  <h3>Products</h3>
                </div>
                <div className="products-list">
                  {parseProducts(selectedOrder.products).map((prod, i) => (
                    <div key={i} className="product-item">
                      {/* Product image */}
                      <div className="product-image-container">
                        {prod.images?.[0] ? (
                          <img 
                            src={`${IMAGE_BASE_URL}${prod.images[0].image}`} 
                            alt={`Product ${prod.product_id}`} 
                            className="product-image" 
                          />
                        ) : (
                          <div className="product-image-placeholder">
                            <FiImage />
                          </div>
                        )}
                      </div>
                      
                      {/* Product info */}
                      <div className="product-info">
                        <div className="product-name">Product #{prod.product_id}</div>
                        <div className="product-details">Qty: {prod.quantity}</div>
                      </div>
                      
                      {/* Product price */}
                      <div className="product-price">₹{prod.unit_price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Modal footer with buttons */}
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              <button className="modal-btn primary" onClick={() => handleDownload(selectedOrder)}>
                <FiDownload /> Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default OrderInfo;