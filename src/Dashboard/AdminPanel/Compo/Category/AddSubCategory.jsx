import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './subcategory.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const SubCategory = () => {
  const {token} = AuthAction.getState('sunState');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategory, setSubCategory] = useState({ name: '', slug: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.post('/api/admin/category/resource', { type: 'fetch' },{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.status === 200) {
          setCategories(res.data.data);
        } else {
          setError(res.data.message || 'Failed to load');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Server error');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug when name changes
    if (subCategory.name) {
      const generatedSlug = subCategory.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .trim();
      setSubCategory(prev => ({ ...prev, slug: generatedSlug }));
    } else {
      setSubCategory(prev => ({ ...prev, slug: '' }));
    }
  }, [subCategory.name]);

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert('Please select a category first');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/admin/sub-category/resource', {
        type: 'store',
        category_id: selectedCategoryId,
        name: subCategory.name,
        slug: subCategory.slug,
        description: subCategory.description,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      alert(res.data.message || 'Sub-category added');
      setSubCategory({ name: '', slug: '', description: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modern-container">
      <h2 className="modern-heading">Select Category</h2>
      {error && <div className="modern-error">{error}</div>}
      
      <div className="modern-select-wrapper">
        <select 
          className="modern-select"
          value={selectedCategoryId} 
          onChange={e => setSelectedCategoryId(e.target.value)}
        >
          <option value="">-- Select a category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.slug}) - {cat.status ? 'Active' : 'Inactive'}
            </option>
          ))}
        </select>
        <div className="modern-select-arrow">⌄</div>
      </div>

      <div className="modern-divider"></div>

      <h3 className="modern-subheading">Add Sub-Category</h3>
      <form onSubmit={handleSubCategorySubmit} className="modern-form">
        <div className="modern-input-group">
          <label className="modern-label">Sub-category name</label>
          <input
            type="text"
            className="modern-input"
            placeholder="Enter name"
            value={subCategory.name}
            onChange={(e) => setSubCategory({ ...subCategory, name: e.target.value })}
            required
          />
        </div>

        <div className="modern-input-group">
          <label className="modern-label">Slug (auto-generated)</label>
          <input
            type="text"
            className="modern-input"
            value={subCategory.slug}
            readOnly
            style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
          />
        </div>

        <div className="modern-input-group">
          <label className="modern-label">Description</label>
          <textarea
            className="modern-textarea"
            placeholder="Enter description"
            value={subCategory.description}
            onChange={(e) => setSubCategory({ ...subCategory, description: e.target.value })}
            required
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          className="modern-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Sub-Category'}
        </button>
      </form>
    </div>
  );
};

export default SubCategory;