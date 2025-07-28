import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../../../CustomStateManage/OrgUnits/AuthState';

const CategorySelector = ({ productData, setProductData }) => {
  const { token } = AuthAction.getState('sunState');

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [isSubLoading, setIsSubLoading] = useState(false); // NEW

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/admin/fetch-all-category', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === 200) {
        setCategoryList(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      setIsSubLoading(true); // NEW
      const res = await axios.post(
        '/api/admin/fetch-sub-category',
        { category_id: categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === 200) {
        setSubCategoryList(res.data.data);
      } else {
        setSubCategoryList([]);
      }
    } catch (err) {
      console.error('Failed to fetch subcategories', err);
      setSubCategoryList([]);
    } finally {
      setIsSubLoading(false); // NEW
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (productData.category_id) {
      fetchSubCategories(productData.category_id);
    } else {
      setSubCategoryList([]);
    }
  }, [productData.category_id]);

  const handleCategoryChange = (selectedId) => {
    setProductData(prev => ({
      ...prev,
      category_id: selectedId,
      subcategory_id: '',
    }));
  };

  const handleSubCategoryChange = (selectedId) => {
    setProductData(prev => ({
      ...prev,
      subcategory_id: selectedId,
    }));
  };

  return (
    <>

      <select
        value={productData.category_id}
        onChange={e => handleCategoryChange(e.target.value)}
        className="form-select mb-3"
      >
        <option value="">-- Select a category --</option>
        {categoryList.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {productData.category_id && (
        <select
          value={productData.subcategory_id}
          onChange={e => handleSubCategoryChange(e.target.value)}
          className="form-select"
        >
          {isSubLoading ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value="">-- Select a subcategory --</option>
              {subCategoryList.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </>
          )}
        </select>
      )}
    </>
  );
};

export default CategorySelector;
