import React, { useState } from 'react';
import './AddCategory.css';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AddCategory = () => {
  const {token} = AuthAction.getState('sunState');

  const [category, setCategory] = useState({
    name: '',
    slug: '',
    description: '',
    status: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;
    
    setCategory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Generate slug if name changes
    if (name === 'name') {
      const generatedSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      setCategory(prev => ({
        ...prev,
        slug: generatedSlug
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!category.name.trim()) newErrors.name = 'Category name is required';
    if (!category.slug.trim()) newErrors.slug = 'Slug is required';
    if (category.slug.includes(' ')) newErrors.slug = 'Slug cannot contain spaces';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      
      const payload = { type: 'store', ...category };

      const res = await axios.post('/api/admin/category/resource', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data.message);


      setSuccessMessage('Category added successfully!');
      
      // Reset form
      setCategory({
        name: '',
        slug: '',
        description: '',
        status: true
      });
      
    } catch (error) {
      console.error('Error submitting category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-category-container">
      <h2 className="add-category-title">Add New Category</h2>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="category-form">
        <div className={`form-group ${errors.name ? 'error' : ''}`}>
          <label htmlFor="name">Category Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="e.g. Hair Dryers"
            className="form-input"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group ${errors.slug ? 'error' : ''}`}>
          <label htmlFor="slug">Slug*</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={category.slug}
            onChange={handleChange}
            placeholder="e.g. hair-dryers"
            className="form-input"
          />
          {errors.slug && <span className="error-message">{errors.slug}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="e.g. Professional and home-use hair dryers"
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group switch-group">
          <label htmlFor="status" className="switch">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={category.status}
              onChange={handleChange}
              className="switch-input"
            />
            <span className="slider round"></span>
          </label>
          <label htmlFor="status" className="switch-label">
            {category.status ? 'Active' : 'Inactive'}
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Adding...
            </>
          ) : (
            'Add Category'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;