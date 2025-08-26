import React, { useEffect, useState } from 'react';
import './SelectedOrder.css'; // Import the CSS file

const SelectedOrder = ({ selectedItem, updateStatus, onSelectOrder }) => { // added onSelectOrder
    if (!selectedItem) return null;
    const [selectedOrder, setSelectedOrder] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    useEffect(() => {
        setSelectedOrder({ ...selectedItem.order });
        const products = typeof selectedItem.products === 'string'
            ? JSON.parse(selectedItem.products)
            : selectedItem.products || [];
        setSelectedProducts(products);
    }, [selectedItem]);
    
    const getProductImage = (item) => {
        if (!Array.isArray(item.images)) return null;
        return item.images.map((img, idx) => (
            <img
                key={idx}
                src={`http://127.0.0.1:8000/images/${img.image}`}
                alt={`Product image ${idx + 1}`}
                className="selected-order-product-image"
                style={{ width: 100, height: 100 }}
            />
        ));
    };
    
    const handleStatusChange = async (field, value) => {
        try {
            await updateStatus(selectedOrder.id, field, value);
            setSelectedOrder(prev => ({ ...prev, [field]: value }));
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };
    
    return (
        <div className="selected-order-container">
            <div className="selected-order-header">
                <h2 className="selected-order-title">Order Details</h2>
                <div className="selected-order-id">#{selectedOrder.id}</div>
                <button 
                    className="selected-order-view-button"
                    onClick={() => onSelectOrder?.(selectedOrder.id)} // call callback if passed
                >
                    View
                </button>
            </div>
            
            <div className="selected-order-customer">
                <strong>Customer:</strong> {selectedItem.user?.name}
            </div>
            
            <table className="selected-order-status-table">
                <tbody>
                    <tr>
                        <td>
                            <select
                                value={selectedOrder.payment_status}
                                onChange={(e) => handleStatusChange('payment_status', e.target.value)}
                                className="selected-order-select"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                        </td>
                        <td>
                            <select
                                value={selectedOrder.delivery_status}
                                onChange={(e) => handleStatusChange('delivery_status', e.target.value)}
                                className="selected-order-select"
                            >
                                <option value="pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <h3 className="selected-order-products-title">Order Items</h3>
            
            {selectedProducts.map((item, idx) => (
                <div key={idx} className="selected-order-product-card">
                    <div className="selected-order-product-info">
                        <div className="selected-order-product-id">ProductId: {item.id}</div>
                        <div className="selected-order-product-name">{item.name}</div>
                    </div>
                    <div className="selected-order-product-images">
                        {getProductImage(item)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedOrder;
