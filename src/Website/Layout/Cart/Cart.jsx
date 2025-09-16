import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileBottomNav from '../MobileNav/MobileNav';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = AuthAction.getState('sunState')?.token;
  const navigate = useNavigate();

  useEffect(() => {

    const syncCart = async () => {
      setLoading(true);
      try {
        const { guestCart = [], cart = [], isAuthenticated } = AuthAction.getState('sunState');

        // Step 1: Determine active cart
        let activeCart = isAuthenticated ? cart : guestCart;

        // Step 2: Merge guestCart into user cart if logged in
        let updatedGuestCart = guestCart;
        if (isAuthenticated && guestCart.length > 0) {
          // Remove duplicates from guestCart (items already in user cart)
          updatedGuestCart = guestCart.filter(
            gItem => !cart.some(cItem => cItem.product_id === gItem.product_id)
          );
          AuthAction.updateState({ ...AuthAction.getState('sunState'), guestCart: updatedGuestCart });
          // Combine for display: user cart + remaining guest items
          activeCart = [...cart, ...updatedGuestCart];
        }

        if (!activeCart.length) {
          setCartItems([]);
          setLoading(false);
          // return;
        }

        // Step 3: Fetch product details
        const productIds = activeCart.map(item => item.product_id);
        const response = await axios.post('/api/fetch-products', { ids: productIds });

        const cartWithDetails = response.data.data.map(product => {
          const cartItem = activeCart.find(item => item.product_id === product.id);
          return { ...product, quantity: cartItem.quantity };
        });

        setCartItems(cartWithDetails);
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      if (!token) return;
        const cart = AuthAction.getState('sunState')?.cart || [];
        // if (!cart.length) return;
        try {
          const res = await axios.post('/api/user/cart',{}, {
            headers: { Authorization: `Bearer ${token}` },
            params: { product_ids: cart.map(item => item.product_id) }
          });
          if (res.data.status === 200) {
              const items = res.data.data.map(item => ({
                  product_id: item.product_id,
                  quantity: item.quantity
              }));

              AuthAction.updateState({ cart: items });
          }
          console.log('Fetched cart from server:', res.data);
        } catch (err) {
          console.error('Failed to fetch cart', err);
        }
    };

    fetchCart();
    syncCart();
  }, []);


  const calculateItemTotal = (price, quantity, discount = 0) => {
    const discountedPrice = price * (1 - discount / 100);
    return (discountedPrice * quantity).toFixed(2);
  };

  const removeFromCart = async (productId) => {
    try {
      const state = AuthAction.getState('sunState');
      let updatedCart = [];

      if (state.isAuthenticated) {
        // Remove from user cart
        updatedCart = (Array.isArray(state.cart) ? state.cart : []).filter(item => item.product_id !== productId);
        AuthAction.updateState({ ...state, cart: updatedCart });

        // Remove from guestCart if any
        if (Array.isArray(state.guestCart) && state.guestCart.length > 0) {
          const newGuestCart = state.guestCart.filter(item => item.product_id !== productId);
          AuthAction.updateState({ ...AuthAction.getState('sunState'), guestCart: newGuestCart });
        }

        setCartItems(prev => prev.filter(item => item.id !== productId));
        window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: updatedCart.length } }));

        await axios.post(
          '/api/user/remove-cart-item',
          { product_id: productId },
          { headers: { Authorization: `Bearer ${state.token}` } }
        );
      } else {
        // Guest cart
        updatedCart = (Array.isArray(state.guestCart) ? state.guestCart : []).filter(item => item.product_id !== productId);
        AuthAction.updateState({ ...state, guestCart: updatedCart });

        setCartItems(prev => prev.filter(item => item.id !== productId));
        window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: updatedCart.length } }));
      }
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    
    try {
      const state = AuthAction.getState('sunState');

      if (state.isAuthenticated) {
        // Update logged-in user cart
        const updatedCart = state.cart.map(item => 
          item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );
        AuthAction.updateState({ ...state, cart: updatedCart });

        // Update server
        const res = await axios.post(
          '/api/user/update-cart-quantity',
          { product_id: productId, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${state.token}` } }
        );

        if (res.data && res.status === 200) {
          const productId = res.data.data.product_id;
          let guestCart = AuthAction.getState('sunState').guestCart;
          guestCart = guestCart.filter(item => item.product_id !== productId);
        }

      } else {
        // Guest cart
        const updatedCart = (state.guestCart || []).map(item => 
          item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );
        AuthAction.updateState({ ...state, guestCart: updatedCart });
      }

      setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    } catch (err) {
      setError('Failed to update quantity');
      console.error(err);
    }
  };


  if (loading) {
    return (
      <>
        <Header />
        <div className="cart-loading">
          <div className="cart-spinner"></div>
          <p>Loading cart...</p>
        </div>
        <Footer />
        <MobileBottomNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="cart-error">
          <p>{error}</p>
        </div>
        <Footer />
        <MobileBottomNav />
      </>
    );
  }

  const handleProceedToCheckout = async () => {
    const state = AuthAction.getState('sunState');

    if (!state.isAuthenticated) {
      navigate('/user-login');
      return;
    }

    try {
      const res = await axios.post(
        '/api/user/add-user-cart',
        { cartItems },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.status === 200) {
        const dbCart = res.data.data;
        const guestCart = state.guestCart || [];

        // Remove duplicates from guestCart
        const newGuestCart = guestCart.filter(item => !dbCart.some(db => db.product_id === item.product_id));

        // Merge DB cart and existing user cart, avoid duplicates
        const combinedCart = [...dbCart, ...state.cart];
        const updatedCart = combinedCart.reduce((acc, item) => {
          if (!acc.some(i => i.product_id === item.product_id)) acc.push(item);
          return acc;
        }, []);

        AuthAction.updateState({
          cart: updatedCart,
          guestCart: newGuestCart
        });

        navigate('/checkout');
      }
    } catch (err) {
      setError('Failed to proceed to checkout');
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.images?.[0]?.image ? (
                      <img src={`https://backendsunclaystudio.space/images/${item.images[0].image}`} alt={item.name} />
                    ) : (
                      <div className="cart-item-no-image">No image</div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-price">
                      {item.discount_percent > 0 ? (
                        <>
                          <span className="original-price">₹{item.price}</span>
                          <span className="discounted-price">
                            ₹{(item.price * (1 - item.discount_percent / 100)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="regular-price">₹{item.price}</span>
                      )}
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, Math.min(item.stock_quantity, item.quantity + 1))}
                        disabled={item.quantity >= item.stock_quantity}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Total: ₹{calculateItemTotal(item.price, item.quantity, item.discount_percent)}
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-total">
                <span>Total:</span>
                <span>
                  ₹
                  {cartItems
                    .reduce(
                      (sum, item) =>
                        sum + parseFloat(calculateItemTotal(item.price, item.quantity, item.discount_percent)),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <button className="checkout-button" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

export default Cart;
