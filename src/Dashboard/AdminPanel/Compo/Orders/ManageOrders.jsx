import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import usePagination from '../../../../Pagination/pagination';
import useSearch from '../../../../SearchHook/useSearch';
import SelectedOrder from './SelectedOrder';
import OrderFullDetail from './OrderFullDetail';
import './ManageOrders.css';

const ManageOrders = () => {
  const { token } = AuthAction.getState('sunState');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { data: orders, metadata, fetchData, PaginationControls } = usePagination('/api/admin/user/orders', 5);
  const products = metadata.products || [];

  const getProductImage = (productId) => {
    const product = products.find(p => p.id === productId) || {};
    return product.images?.[0]?.image ? `http://127.0.0.1:8000/images/${product.images[0].image}` : '';
  };

  const updateStatus = async (orderId, field, value) => {
    try {
      const res = await axios.patch(`/api/admin/orders/${orderId}/status`, { field, value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 200) fetchData();
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  // Search Hook (refactored)
  const { query, setQuery, suggestions, selectingItem, selectedItem } = useSearch('/api/admin/orders/search');

  useEffect(() => {
    if (selectedItem) console.log('Selected order:', selectedItem);
  }, [selectedItem]);

  const handleOrderFullDetail = (orderId) => setSelectedOrderId(orderId);

  return (
    <div className="manage-orders-container">
      <h2 className="manage-orders-title">Manage Orders</h2>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search orders..."
        style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
      />

      {/* Suggestions rendering handled here */}
    {suggestions.length > 0 && (
  <ul className="list-group position-absolute shadow" style={{ zIndex: 1000, width: '250px' }}>
    {suggestions.map((s, i) => {
      let price = '';
      if (s.products) {
        try {
          const prods = JSON.parse(s.products);
          price = prods[0]?.unit_price || '';
        } catch (err) {
          price = '';
        }
      }
      return (
        <li
          key={i}
          onMouseDown={() => selectingItem(s)}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <span>{s.item_name || s.name || `ORD-${s.id}`}</span>
          {price && <span className="badge bg-primary rounded-pill">₹{price}</span>}
        </li>
      );
    })}
  </ul>
)}



      {/* Conditionally render */}
      {selectedOrderId ? (
        <OrderFullDetail id={selectedOrderId} />
      ) : selectedItem ? (
        <SelectedOrder
          selectedItem={selectedItem}
          updateStatus={updateStatus}
          onSelectOrder={setSelectedOrderId}
        />
      ) : (
        <table className="manage-orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Item</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map((order, index) => {
              const orderProducts = order.products ? JSON.parse(order.products) : [];
              const firstProduct = orderProducts[0] || {};
              const imageUrl = firstProduct.product_id ? getProductImage(firstProduct.product_id) : '';

              return (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{`ORD-${String(order.id).padStart(3, '0')}`}</td>
                  <td>{order.user?.name || 'Unknown'}</td>
                  <td className="manage-orders-item-cell">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Product" className="manage-orders-item-image" />
                    ) : (
                      <span className="manage-orders-no-image">No image</span>
                    )}
                    {firstProduct.quantity ? `${firstProduct.quantity} item(s)` : 'No items'}
                  </td>
                  <td>
                    <select
                      value={order.payment_status}
                      onChange={(e) => updateStatus(order.id, 'payment_status', e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={order.delivery_status}
                      onChange={(e) => updateStatus(order.id, 'delivery_status', e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleOrderFullDetail(order.id)}>View</button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="7">No orders</td></tr>
            )}
          </tbody>
        </table>
      )}

      <div className="manage-orders-pagination">
        <PaginationControls />
      </div>
    </div>
  );
};

export default ManageOrders;
