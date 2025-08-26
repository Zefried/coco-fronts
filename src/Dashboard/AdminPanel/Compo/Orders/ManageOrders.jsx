import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import usePagination from '../../../../Pagination/pagination';
import useSearch from '../../../../SearchHook/useSearch';
import SelectedOrder from './SelectedOrder';
import OrderFullDetail from './OrderFullDetail'; // new component
import './ManageOrders.css';

const ManageOrders = () => {
  const { token } = AuthAction.getState('sunState');
  const [selectedOrderId, setSelectedOrderId] = useState(null); // state to hold full detail ID

  // Pagination
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

  // Search Hook
  const { query, setQuery, SuggestionsList, selectedItem } = useSearch('/api/admin/orders/search');

  useEffect(() => {
    if (selectedItem) {
      console.log('Selected order:', selectedItem);
    }
  }, [selectedItem]);

  // Pass order ID to full detail
  const handleOrderFullDetail = (orderId) => {
    setSelectedOrderId(orderId);
  };

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
      <SuggestionsList />

      {/* Conditionally render either full detail or table */}
      {selectedOrderId ? (
        <OrderFullDetail id={selectedOrderId} />
      ) : selectedItem ? (
        <SelectedOrder
          selectedItem={selectedItem}
          updateStatus={updateStatus}
          onSelectOrder={(id) => setSelectedOrderId(id)}
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
                <tr key={order.id} className="manage-orders-row">
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
                      className="manage-orders-select"
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
                      className="manage-orders-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleOrderFullDetail(order.id)}
                      className="manage-orders-button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="7" className="manage-orders-no-orders">No orders</td></tr>
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
