import React, { useEffect, useState } from 'react';
import './Checkout.css';
import scanner from '../../../assets/img/Scanner/scanner.jpg';
import axios from 'axios';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const Checkout = () => {
  const token = AuthAction.getState('sunState').token;
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    useAsShipping: true,
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('now');
  const [couponCode, setCouponCode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    getCheckoutItems();
  }, []);

  const getCheckoutItems = async () => {
    const cartData = AuthAction.getState('sunState').cart;

    if (cartData.length > 0) {
      try {
        const res = await axios.post(
          '/api/user/checkout-items',
          { cart: cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data);
        setCheckoutItems(res.data.data); // ✅ store real API data
      } catch (err) {
        console.error('Failed to fetch checkout items', err);
      }
    } else {
      alert('No items in cart');
    }
  };

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const shipping = 50;
  const total = subtotal + tax + shipping;

  const handleApplyCoupon = () => {
    const validCoupons = { SAVE10: 100, WELCOME20: 200 };
    if (validCoupons[couponCode.toUpperCase()]) {
      alert(
        `Coupon applied successfully. Saved ₹${validCoupons[couponCode.toUpperCase()]}`
      );
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'useAsShipping' && checked) {
      setShippingInfo({
        name: billingInfo.name,
        address: billingInfo.address,
        pincode: billingInfo.pincode,
      });
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'now' && !transactionId.trim()) {
      alert('Transaction ID is required for Pay Now option');
      return;
    }

    const res = await axios.post('/api/user/checkout',{
      billingInfo,
      shippingInfo,
      paymentMethod,
      transactionId
    },{
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(res.data);
    alert('Order placed successfully!');
  };

  let scannerDiv = (
    <div className="co-scanner-container">
      <img className="co-scanner-image" src={scanner} alt="Scanner" />
      <label className="co-scanner-label" htmlFor="transaction_id">
        UPI Transaction ID
      </label>
      <input
        className="co-scanner-input"
        type="text"
        name="transaction_id"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
    </div>
  );

  return (
    <div className="co-checkout-container">
      <h1>Checkout</h1>
      <div className="co-checkout-content">
        <div className="co-checkout-form">
          <form onSubmit={handleSubmit}>
            {/* Billing Section */}
            <div className="co-form-section">
              <h2>Billing Information</h2>
              <div className="co-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={billingInfo.name}
                  onChange={handleBillingChange}
                  required
                />
              </div>
              <div className="co-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={billingInfo.phone}
                  onChange={handleBillingChange}
                  required
                />
              </div>
              <div className="co-form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleBillingChange}
                  required
                  rows="3"
                ></textarea>
              </div>
              <div className="co-form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={billingInfo.pincode}
                  onChange={handleBillingChange}
                  required
                />
              </div>
              <div className="co-checkbox-group">
                <input
                  type="checkbox"
                  id="useAsShipping"
                  name="useAsShipping"
                  checked={billingInfo.useAsShipping}
                  onChange={handleBillingChange}
                />
                <label htmlFor="useAsShipping">Use as shipping address</label>
              </div>
            </div>
            {/* Shipping Section */}
            {!billingInfo.useAsShipping && (
              <div className="co-form-section">
                <h2>Shipping Information</h2>
                <div className="co-form-group">
                  <label htmlFor="shippingName">Full Name</label>
                  <input
                    type="text"
                    id="shippingName"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="co-form-group">
                  <label htmlFor="shippingAddress">Address</label>
                  <textarea
                    id="shippingAddress"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                    rows="3"
                  ></textarea>
                </div>
                <div className="co-form-group">
                  <label htmlFor="shippingPincode">Pincode</label>
                  <input
                    type="text"
                    id="shippingPincode"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
            )}
            {/* Payment Section */}
            <div className="co-form-section">
              <h2>Payment Method</h2>
              <div className="co-payment-options">
                <div
                  className={`co-payment-option ${
                    paymentMethod === 'now' ? 'active' : ''
                  }`}
                  onClick={() => setPaymentMethod('now')}
                >
                  <div className="co-payment-radio">
                    <div
                      className={`co-radio-dot ${
                        paymentMethod === 'now' ? 'selected' : ''
                      }`}
                    ></div>
                  </div>
                  <div className="co-payment-details">
                    <h3>Pay Now</h3>
                    <p>Scan & Pay Securely</p>
                  </div>
                </div>
                <div className="co-payment-details">
                  {paymentMethod === 'now' ? scannerDiv : ''}
                </div>
                <div
                  className={`co-payment-option ${
                    paymentMethod === 'later' ? 'active' : ''
                  }`}
                  onClick={() => setPaymentMethod('later')}
                >
                  <div className="co-payment-radio">
                    <div
                      className={`co-radio-dot ${
                        paymentMethod === 'later' ? 'selected' : ''
                      }`}
                    ></div>
                  </div>
                  <div className="co-payment-details">
                    <h3>Pay Later</h3>
                    <p>You can Pay Later</p>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="co-place-order-btn" >
              Place Order
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="co-order-summary">
          <h2>Order Summary</h2>
          <div className="co-order-items">
            {checkoutItems.map((item, index) => (
              <div key={index} className="co-order-item">
                <div className="co-item-info">
                  <h3>{item.product.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="co-item-price">₹{item.product.price}</div>
              </div>
            ))}
          </div>
          <div className="co-order-totals">
            <div className="co-total-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="co-total-row">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="co-total-row">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="co-total-row co-grand-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="co-promo-code">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
