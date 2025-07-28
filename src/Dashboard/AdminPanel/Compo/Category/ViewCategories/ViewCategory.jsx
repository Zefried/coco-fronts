import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewCategory.css';

const ViewCategory = () => {
  const {token} = AuthAction.getState('sunState');
  const [categories, setCategories] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/admin/fetch-all-category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      setCategories(res.data.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    setIsDeleting(id);
    try {
      await axios.delete(`/api/admin/delete-category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Failed to delete category', err);
      alert('Failed to delete category');
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h1 className="category-header">Product Categories</h1>
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-card-header">
              <h3 className="category-name">{cat.name}</h3>
              <span className={`category-status ${cat.status ? 'active' : 'inactive'}`}>
                {cat.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="category-description">
              {cat.description || 'No description provided'}
            </p>
            <div className="category-meta">
              <span className="category-date">Created: {new Date(cat.created_at).toLocaleDateString()}</span>
              <span className="category-slug">/{cat.slug}</span>
            </div>
            <button 
              onClick={() => handleDelete(cat.id)}
              disabled={isDeleting === cat.id}
              className="delete-button"
            >
              {isDeleting === cat.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCategory;