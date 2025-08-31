import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewProducts.css';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../../../../SearchHook/useSearch';

const ViewProducts = () => {
    const navigate = useNavigate();
    const { token } = AuthAction.getState('sunState');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isSubLoading, setIsSubLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 5;

    // Keep track of selected category/subcategory for pagination
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const { query, setQuery, suggestions, selectingItem, selectedItem } = useSearch('/api/admin/products/search');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/admin/fetch-all-category', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(res.data.data);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubcategories = async (catId) => {
        try {
            setIsLoading(true);
            setIsSubLoading(true);
            const res = await axios.post(
                '/api/admin/fetch-sub-category',
                { category_id: catId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubCategories(res.data.data);
        } catch (err) {
            console.error('Failed to fetch subcategories', err);
        } finally {
            setIsSubLoading(false);
            setIsLoading(false);
        }
    };

    const fetchProductsByCategory = async (catId, page = 1) => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/admin/fetch-products/category', {
                headers: { Authorization: `Bearer ${token}` },
                params: { category_id: catId, page, perPage }
            });
            setProducts(res.data.data.products || []);
            setTotalPages(res.data.data.totalPages || 1);
            setCurrentPage(page);
        } catch (err) {
            console.error('Failed to fetch products by category', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProductsBySubcategory = async (subId, page = 1) => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/admin/fetch-products/subcategory', {
                headers: { Authorization: `Bearer ${token}` },
                params: { sub_category_id: subId, page, perPage }
            });
            setProducts(res.data.data.products || []);
            setTotalPages(res.data.data.totalPages || 1);
            setCurrentPage(page);
        } catch (err) {
            console.error('Failed to fetch products by subcategory', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (subCategoryId) fetchProductsBySubcategory(subCategoryId, page);
        else if (categoryId) fetchProductsByCategory(categoryId, page);
    };

    const handleCategoryChange = (e) => {
        const catId = e.target.value;
        if (!catId) return;
        setCategoryId(catId);
        setSubCategoryId(null);
        setSubCategories([]);
        setProducts([]);
        fetchSubcategories(catId);
        fetchProductsByCategory(catId);
    };

    const handleSubCategoryChange = (e) => {
        const subId = e.target.value;
        if (!subId) return;
        setSubCategoryId(subId);
        fetchProductsBySubcategory(subId);
    };

    const handleFullInfo = (productId) => navigate(`/admin/product-full-info/${productId}`);

    const handleBestSellerChange = async (productId, value) => {
        try {
            await axios.post(
                `/api/admin/product/${productId}/status`,
                { best_seller: value === 'Yes' ? 1 : 0 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProducts(prev =>
                prev.map(p => (p.id === productId ? { ...p, best_seller: value === 'Yes' ? 1 : 0 } : p))
            );
        } catch (err) {
            console.error('Failed to update best seller status', err);
        }
    };

    useEffect(() => {
        if (selectedItem?.data?.id) {
            navigate(`/admin/product-full-info/${selectedItem.data.id}`);
        }
    }, [selectedItem, navigate]);

    return (
        <div className="vp-view-products-container">
            {isLoading && (
                <div className="vp-global-loader">
                    <span className="vp-loading-spinner"></span> Loading...
                </div>
            )}
            <p>Products</p>

            {/* 🔍 Search bar */}
            <div style={{ position: 'relative', width: '300px', marginBottom: '10px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    style={{ width: '100%', padding: '8px' }}
                />
                <div className="position-relative">
                    {suggestions.length > 0 && (
                        <ul className="list-group position-absolute shadow-sm" style={{maxWidth: '320px', zIndex: 1060}}>
                            {suggestions.map((s, i) => (
                                <li 
                                    key={i} 
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-3"
                                    style={{cursor: 'pointer'}}
                                    onMouseDown={() => selectingItem(s)}
                                >
                                    <span className="fw-medium mx-3">{s.name}</span>
                                    {s.price && <span className="badge bg-primary rounded-pill">₹{s.price}</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="vp-filters">
                <select onChange={handleCategoryChange}>
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {isSubLoading ? (
                    <div className="vp-loading-state">
                        <span className="vp-loading-spinner"></span> Loading subcategories...
                    </div>
                ) : (
                    subCategories.length > 0 && (
                        <select onChange={handleSubCategoryChange}>
                            <option value="">Select subcategory</option>
                            {subCategories.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    )
                )}
            </div>

            <div className="vp-products-section">
                <h3>Product list</h3>
                {products.length > 0 ? (
                    <ul className="vp-products-list">
                        {products.map(prod => (
                            <li key={prod.id} className="vp-product-row">
                                {prod.images?.[0]?.image && (
                                    <img
                                        src={`http://127.0.0.1:8000/images/${prod.images[0].image}`}
                                        alt={prod.name}
                                        className="vp-product-images"
                                    />
                                )}
                                <div className="vp-product-info">
                                    <div className="vp-product-name">{prod.name}</div>
                                    <div className="vp-product-detail"><strong>Price</strong> ₹{prod.price}</div>
                                    <div className="vp-product-detail"><strong>Weight</strong> {prod.weight}g</div>
                                    <div className="vp-product-detail"><strong>Stock</strong> {prod.stock_quantity}</div>
                                    <div className="vp-product-detail"><strong>Fragile</strong> {prod.is_fragile ? 'Yes' : 'No'}</div>
                                    <div className="vp-product-detail">
                                        <strong>Best Seller</strong>
                                        <select
                                            value={prod.best_seller ? 'Yes' : 'No'}
                                            onChange={(e) => handleBestSellerChange(prod.id, e.target.value)}
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="vp-product-detail">
                                        <button className="vp-btn vp-btn-outline-primary vp-sm" onClick={()=> handleFullInfo(prod.id)}>View details</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="vp-empty-state">No products found. Select a category to view products.</div>
                )}
            </div>

            {/* Pagination controls */}
            <nav aria-label="Products pagination" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                    </li>
                    <li className="page-item disabled">
                    <span className="page-link">
                        Page {currentPage} of {totalPages}
                    </span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                    </li>
                </ul>
            </nav>


        </div>
    );
};

export default ViewProducts;
