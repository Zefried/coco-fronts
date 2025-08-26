// PotterySpecification.jsx
import React from 'react';
import './PotterySpecification.css';

const PotterySpecifications = ({ productData, setProductData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProductData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4">Pottery Specifications</h4>
      <form>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">Clay Type*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Earthenware"
              name="clay_type"
              value={productData.clay_type}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Firing Method*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Electric"
              name="firing_method"
              value={productData.firing_method}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">Glaze Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Celadon, Shino"
              name="glaze_type"
              value={productData.glaze_type}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Red, Blue"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">Dimensions (H×W×D in cm)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 15×10×10"
              name="dimensions"
              value={productData.dimensions}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Weight (grams)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Estimated weight"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="fragileCheck"
            name="is_fragile"
            checked={productData.is_fragile}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="fragileCheck">
            Fragile Item
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">YouTube Link</label>
          <input
            type="text"
            className="form-control"
            placeholder="YouTube video URL"
            name="youtube_link"
            value={productData.youtube_link}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default PotterySpecifications;
