// InventoryAndImages.jsx
import React from 'react';
import './InventoryAndImg.css';

const InventoryAndImages = ({ productData, setProductData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProductData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // limit to 5
    setProductData(prev => ({ ...prev, images: files }));
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4">Inventory & Images</h4>
      <form>
        <div className="mb-3">
          <label className="form-label">Stock Quantity*</label>
          <input
            type="number"
            className="form-control"
            placeholder="Available pieces"
            name="stock_quantity"
            value={productData.stock_quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="handmadeCheck"
            name="is_handmade"
            checked={productData.is_handmade}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="handmadeCheck">
            Handmade Item
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Images* (Max 5)</label>
          <input
            type="file"
            className="form-control"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleFileChange}
          />
          <small className="form-text text-muted">
            JPEG, PNG only (Max 5 images)
          </small>
        </div>
      </form>
    </div>
  );
};

export default InventoryAndImages;
