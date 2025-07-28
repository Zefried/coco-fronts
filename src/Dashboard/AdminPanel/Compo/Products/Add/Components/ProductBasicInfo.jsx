// ProductBasicInfo.jsx
import React from 'react';
import './ProductBasic.css';

const ProductBasicInfo = ({ productData, setProductData }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4">Basic Information</h4>
      <form>
        <div className="mb-3">
          <label className="form-label">Product Name*</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Hand-thrown Ceramic Vase"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description*</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Describe your pottery piece in detail..."
            name="description"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Base Price (₹)*</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Discount Percentage</label>
            <input
              type="number"
              className="form-control"
              placeholder="%"
              name="discount_percent"
              value={productData.discount_percent}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductBasicInfo;
