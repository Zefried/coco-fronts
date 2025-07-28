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

    return (
        <div className="view-products-container">
            {isLoading && (
                <div className="global-loader">
                    <span className="loading-spinner"></span> Loading...
                </div>
            )}

            <p>Products</p>

            <div className="filters">
                <select onChange={handleCategoryChange}>
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {isSubLoading ? (
                    <div className="loading-state">
                        <span className="loading-spinner"></span>
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

            <div className="products-section">
                <h3>Product list</h3>

                {products.length > 0 ? (
                    <ul className="products-list">
                        {products.map(prod => (
                            <li key={prod.id} className="product-row">
                                {prod.images?.[0]?.image && (
                                    <img
                                        src={`http://127.0.0.1:8000/images/${prod.images[0].image}`}
                                        alt={prod.name}
                                        className="product-images"
                                    />
                                )}
                                <div className="product-info">
                                    <div className="product-name">{prod.name}</div>
                                    <div className="product-detail">
                                        <strong>Price</strong>
                                        ₹{prod.price}
                                    </div>
                                    <div className="product-detail">
                                        <strong>Weight</strong>
                                        {prod.weight}g
                                    </div>
                                    <div className="product-detail">
                                        <strong>Stock</strong>
                                        {prod.stock_quantity}
                                    </div>
                                    <div className="product-detail">
                                        <strong>Fragile</strong>
                                        {prod.is_fragile ? 'Yes' : 'No'}
                                    </div>
                                    <div className="product-detail">
                                        <button className="btn btn-outline-primary sm" onClick={()=> handleFullInfo(prod.id)}>View details</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-state">
                        No products found. Select a category to view products.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewProducts;
