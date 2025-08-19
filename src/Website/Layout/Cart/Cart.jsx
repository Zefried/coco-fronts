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
    const fetchCartProducts = async () => {
      setLoading(true);
      try {
        const { guestCart, cart } = AuthAction.getState('sunState');
        const activeCart = Array.isArray(guestCart) && guestCart.length ? guestCart : cart;

        if (!Array.isArray(activeCart) || activeCart.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const productIds = activeCart.map(item => item.product_id);
        const response = await axios.post('/api/fetch-products', { ids: productIds });

        const cartWithDetails = response.data.data.map(product => {
          const cartItem = activeCart.find(item => item.product_id === product.id);
          return {
            ...product,
            quantity: cartItem.quantity
          };
        });

        setCartItems(cartWithDetails);
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const calculateItemTotal = (price, quantity, discount = 0) => {
    const discountedPrice = price * (1 - discount / 100);
    return (discountedPrice * quantity).toFixed(2);
  };

    const removeFromCart = (productId) => {
        try {
            const { guestCart, ...restState } = AuthAction.getState('sunState');
            const updatedCart = guestCart.filter(item => item.product_id !== productId);
            
            AuthAction.updateState({
            ...restState,
            guestCart: updatedCart
            });

            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));

            // Dispatch custom event with new cart count
            const cartCountEvent = new CustomEvent('cartCountUpdated', {
            detail: { count: updatedCart.length }
            });
            window.dispatchEvent(cartCountEvent);

        } catch (err) {
            setError('Failed to remove item from cart');
            console.error(err);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        try {
          const { guestCart, ...restState } = AuthAction.getState('sunState');
          const updatedCart = guestCart.map(item => 
            item.product_id === productId 
              ? { ...item, quantity: newQuantity }
              : item
          );

          AuthAction.updateState({
            ...restState,
            guestCart: updatedCart
          });

          setCartItems(prevItems => 
            prevItems.map(item => 
              item.id === productId 
                ? { ...item, quantity: newQuantity }
                : item
            )
          );
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

      let isAuthenticated = AuthAction.getState('sunState')?.isAuthenticated;

      // Redirect to login if user is not authenticated
      if(!isAuthenticated){
          navigate('/user-login')
          return;
      }

      // When proceeding to checkout, we sync the client-side cart with the database:
      // 1. Send current cart items to the server and get the updated database cart.
      // 2. Remove from guestCart any items that already exist in the database.
      // 3. Merge the database cart with the existing client-side cart, ensuring no duplicate product_ids.
      // 4. Update the state so that cart reflects all unique items and guestCart only contains items not yet in DB.
    
      const res = await axios.post('/api/user/add-user-cart', { cartItems }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      if(res.data.status === 200){
          const dbCart = res.data.data;
          const guestCart = AuthAction.getState('sunState').guestCart;

          // Remove items from guestCart that are already in DB
          const newGuestCart = guestCart.filter(item => !dbCart.some(db => db.product_id === item.product_id));

          // Merge DB cart and existing client cart, avoiding duplicates by product_id
          const combinedCart = [...dbCart, ...AuthAction.getState('sunState').cart];
          const updatedCart = combinedCart.reduce((acc, item) => {
              if(!acc.some(i => i.product_id === item.product_id)){
                  acc.push(item);
              }
              return acc;
          }, []);

          AuthAction.updateState({
              cart: updatedCart,
              guestCart: newGuestCart
          });
      }
    }


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
                      <img 
                        src={`http://127.0.0.1:8000/images/${item.images[0].image}`}
                        alt={item.name}
                      />
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
                            ₹{(item.price * (1 - item.discount_percent/100)).toFixed(2)}
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
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
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
                <span>₹{cartItems.reduce((sum, item) => (
                  sum + parseFloat(calculateItemTotal(item.price, item.quantity, item.discount_percent))
                ), 0).toFixed(2)}</span>
              </div>
              <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
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