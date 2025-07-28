import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

const FixCategories = () => {
  const { title } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoryTitle = location.state?.title || title;
        const res = await axios.post('/api/fetch-products/static-categories', {
          category_title: categoryTitle
        });
        setProducts(res.data.data || []);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [title, location.state]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="fix-categories-container">
      <Header />
      <h2>Products in {title.replace(/-/g, ' ').toUpperCase()}</h2>
      {products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="shopify-products-grid">
          {products.map(product => (
            <div className="shopify-product-card" key={product.id}>
              <div className="shopify-product-image-wrap">
                {product.images?.[0]?.image ? (
                  <img
                    src={`http://127.0.0.1:8000/images/${product.images[0].image}`}
                    alt={product.name}
                    className="shopify-product-image"
                  />
                ) : (
                  <div className="shopify-product-image placeholder">No Image</div>
                )}
              </div>
              <div className="shopify-product-info">
                <h3 className="shopify-product-title">{product.name}</h3>
                <div className="shopify-product-price">₹{product.price}</div>
                <div className="shopify-product-stock">Stock: {product.stock_quantity}</div>
                <div className="shopify-product-desc">{product.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FixCategories;
