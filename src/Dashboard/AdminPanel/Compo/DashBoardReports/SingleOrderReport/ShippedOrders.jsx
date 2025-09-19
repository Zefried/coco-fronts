import { useEffect, useState } from "react";
import axios from "axios";
import { AuthAction } from "../../../../../CustomStateManage/OrgUnits/AuthState";
import OrderFullDetail from "../../Orders/OrderFullDetail";
import './Styles/shippedOrder.css';

const ShippedOrders = () => {
  const { token } = AuthAction.getState("sunState");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Calendar states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const fetchShippedOrders = async (start = "", end = "") => {
    setLoading(true);
    try {
      // Build query parameters if dates are provided
      let url = "/api/admin/orders/shipped";
      const params = new URLSearchParams();
      
      if (start) params.append("start_date", start);
      if (end) params.append("end_date", end);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.data.status === 200) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch shipped orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShippedOrders();
  }, []);

  const updateDeliveryStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(`/api/admin/orders/${orderId}/status`, 
        { field: 'delivery_status', value: status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status === 200) {
        fetchShippedOrders(startDate, endDate); // Refresh with current filters
      }
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
  };

  const handleDateFilter = () => {
    fetchShippedOrders(startDate, endDate);
  };

  const resetDateFilter = () => {
    setStartDate("");
    setEndDate("");
    fetchShippedOrders();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  if (selectedOrderId) {
    return (
      <div className="shipped-orders-container">
        <div className="back-button-container">
          <button className="btn btn-secondary" onClick={handleBackToList}>
            ← Back to Orders
          </button>
        </div>
        <OrderFullDetail id={selectedOrderId} />
      </div>
    );
  }

  return (
    <div className="shipped-orders-container">
      <div className="orders-header">
        <h3 className="shipped-orders-title">Shipped Orders</h3>
        
        <div className="calendar-filter-container">
          <button 
            className="calendar-toggle-btn"
            onClick={toggleCalendar}
          >
            {showCalendar ? "Hide Calendar" : "Filter by Date"}
          </button>
          
          {showCalendar && (
            <div className="calendar-controls">
              <div className="date-input-group">
                <label>From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="date-input-group">
                <label>To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="calendar-actions">
                <button 
                  className="apply-filter-btn"
                  onClick={handleDateFilter}
                  disabled={!startDate && !endDate}
                >
                  Apply
                </button>
                <button 
                  className="reset-filter-btn"
                  onClick={resetDateFilter}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders-container">
          {startDate || endDate ? "No shipped orders found for the selected date range" : "No shipped orders found"}
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const orderProducts = JSON.parse(order.products);
            const itemCount = orderProducts.reduce((acc, p) => acc + (p.quantity || 0), 0);
            
            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Order #{order.id}</div>
                  <div className="order-date">{new Date(order.order_date).toLocaleDateString()}</div>
                </div>
                
                <div className="order-info">
                  <div className="order-customer">
                    <strong>Customer:</strong> {order.user?.name || "Unknown"}
                  </div>
                  <div className="order-items">
                    <strong>Items:</strong> {itemCount} item(s)
                  </div>
                  <div className="order-address">
                    <strong>Address:</strong> {order.address}, {order.pin}
                  </div>
                </div>
                
                <div className="order-status">
                  <div className="status-group">
                    <label>Payment Status:</label>
                    <span className={`status-badge ${order.payment_status}`}>
                      {order.payment_status}
                    </span>
                  </div>
                  
                  <div className="status-group">
                    <label>Delivery Status:</label>
                    <select 
                      value={order.delivery_status}
                      onChange={(e) => updateDeliveryStatus(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="btn btn-primary view-btn"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShippedOrders;