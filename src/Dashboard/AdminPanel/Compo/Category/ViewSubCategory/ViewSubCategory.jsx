import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewSubCategory.css';

const ViewSubCategory = () => {
  const {token} = AuthAction.getState('sunState');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/api/admin/fetch-all-category', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        '/api/admin/fetch-sub-category',
        { category_id: categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    if (!window.confirm('Are you sure you want to delete this sub-category?')) return;
    
    try {
      setDeletingId(subCategoryId);
      await axios.delete(`/api/admin/delete-sub-category/${subCategoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubCategories(subCategories.filter(sub => sub.id !== subCategoryId));
    } catch (error) {
      console.error('Error deleting sub-category:', error);
      alert('Failed to delete sub-category');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
    if (id) {
      fetchSubCategories(id);
    } else {
      setSubCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="subcategory-container">
      <div className="subcategory-header">
        <h2>Sub-Categories</h2>
        <p>Select a category to view its sub-categories</p>
      </div>

      <div className="category-selector">
        <select 
          onChange={handleCategoryChange} 
          value={selectedCategoryId}
          className="category-dropdown"
          disabled={isLoading}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {isLoading && <div className="loading-spinner"></div>}
      </div>

      {selectedCategoryId && (
        <div className="subcategory-list">
          <h3 className="subcategory-list-title">
            Sub-Categories {subCategories.length > 0 && `(${subCategories.length})`}
          </h3>
          
          {subCategories.length > 0 ? (
            <div className="subcategory-grid">
              {subCategories.map((sub) => (
                <div key={sub.id} className="subcategory-card">
                  <div className="subcategory-card-header">
                    <h4>{sub.name}</h4>
                    <span className="subcategory-status">
                      {sub.status === null ? 'No status' : sub.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="subcategory-description">
                    {sub.description || 'No description available'}
                  </p>
                  <div className="subcategory-meta">
                    <span>/{sub.slug}</span>
                    <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteSubCategory(sub.id)}
                    disabled={deletingId === sub.id}
                    className="delete-subcategory-btn"
                  >
                    {deletingId === sub.id ? (
                      <span className="deleting-text">Deleting...</span>
                    ) : (
                      <span className="delete-text">Delete</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-subcategories">
              No sub-categories found for this category
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewSubCategory;