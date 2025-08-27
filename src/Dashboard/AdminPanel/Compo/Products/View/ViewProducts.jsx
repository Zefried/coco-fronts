import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewProducts.css';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
    const navigate = useNavigate();
    
    const { token } = AuthAction.getState('sunState');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isSubLoading, setIsSubLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // added loading state

    useEffect(() => {
        fetchCategories();
    }, []);

    products.map((item)=>{
        console.log(item.best_seller);
    })

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/admin/fetch-all-category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(res.data.data);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            setIsLoading(true);
            setIsSubLoading(true);
            const res = await axios.post(
                '/api/admin/fetch-sub-category',
                { category_id: categoryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSubCategories(res.data.data);
            console.log('Subcategories:', res.data.data);
        } catch (err) {
            console.error('Failed to fetch subcategories', err);
        } finally {
            setIsSubLoading(false);
            setIsLoading(false);
        }
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                '/api/admin/fetch-products/category',
                { category_id: categoryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProducts(res.data.data);
            console.log('Products by category:', res.data.data);
        } catch (err) {
            console.error('Failed to fetch products by category', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProductsBySubcategory = async (subCategoryId) => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                '/api/admin/fetch-products/subcategory',
                { sub_category_id: subCategoryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProducts(res.data.data);
            console.log('Products by subcategory:', res.data.data);
        } catch (err) {
            console.error('Failed to fetch products by subcategory', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSubCategories([]);
        setProducts([]);
        fetchSubcategories(categoryId);
        fetchProductsByCategory(categoryId);
    };

    const handleSubCategoryChange = (e) => {
        const subCategoryId = e.target.value;
        fetchProductsBySubcategory(subCategoryId);
    };

    const handleFullInfo = (productId) => {
        navigate(`/admin/product-full-info/${productId}`);
    };

    const handleEditProduct = (id) => {
        navigate(`/admin/edit-product/${id}`);
    };

    // add this handler inside your component
    const handleBestSellerChange = async (productId, value) => {
        try {
            const res = await axios.post(
                `/api/admin/product/${productId}/status`,
                { best_seller: value === 'Yes' ? 1 : 0 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // ✅ Update local state instantly
            setProducts(prev =>
                prev.map(p =>
                    p.id === productId ? { ...p, best_seller: value === 'Yes' ? 1 : 0 } : p
                )
            );

            console.log('Best seller status updated:', res.data);
        } catch (err) {
            console.error('Failed to update best seller status', err);
        }
    };


    return (
        <div className="vp-view-products-container">
            {isLoading && (
                <div className="vp-global-loader">
                    <span className="vp-loading-spinner"></span> Loading...
                </div>
            )}
            <p>Products</p>
            <div className="vp-filters">
                <select onChange={handleCategoryChange}>
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {isSubLoading ? (
                    <div className="vp-loading-state">
                        <span className="vp-loading-spinner"></span>
                        Loading subcategories...
                    </div>
                ) : (
                    subCategories.length > 0 && (
                        <select onChange={handleSubCategoryChange}>
                            <option value="">Select subcategory</option>
                            {subCategories.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
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
                                    <div className="vp-product-detail">
                                        <strong>Price</strong>
                                        ₹{prod.price}
                                    </div>
                                    <div className="vp-product-detail">
                                        <strong>Weight</strong>
                                        {prod.weight}g
                                    </div>
                                    <div className="vp-product-detail">
                                        <strong>Stock</strong>
                                        {prod.stock_quantity}
                                    </div>
                                    <div className="vp-product-detail">
                                        <strong>Fragile</strong>
                                        {prod.is_fragile ? 'Yes' : 'No'}
                                    </div>
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
                                        <button className="vp-btn vp-btn-outline-primary vp-sm" onClick={() => handleEditProduct(prod.id)}>Edit Prod</button>
                                    </div>
                                    <div className="vp-product-detail">
                                        <button className="vp-btn vp-btn-outline-primary vp-sm" onClick={()=> handleFullInfo(prod.id)}>View details</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="vp-empty-state">
                        No products found. Select a category to view products.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewProducts;