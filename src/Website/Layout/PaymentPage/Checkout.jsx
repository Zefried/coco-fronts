// Checkout.jsx
import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
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

  const orderItems = [
    { id: 1, name: 'Product A', quantity: 2, price: 500 },
    { id: 2, name: 'Product B', quantity: 1, price: 300 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shipping = 50;
  const total = subtotal + tax + shipping;

  const handleApplyCoupon = () => {
    const validCoupons = { 'SAVE10': 100, 'WELCOME20': 200 };

    if (validCoupons[couponCode.toUpperCase()]) {
      alert(`Coupon applied successfully. Saved ₹${validCoupons[couponCode.toUpperCase()]}`);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing Info:', billingInfo);
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Method:', paymentMethod);
    alert('Order placed successfully!');
  };

  return (
    <div className="co-checkout-container">
      <h1>Checkout</h1>
      <div className="co-checkout-content">
        <div className="co-checkout-form">
          <form onSubmit={handleSubmit}>
            <div className="co-form-section">
              <h2>Billing Information</h2>
              <div className="co-form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={billingInfo.name} onChange={handleBillingChange} required />
              </div>
              <div className="co-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={billingInfo.phone} onChange={handleBillingChange} required />
              </div>
              <div className="co-form-group">
                <label htmlFor="address">Address</label>
                <textarea id="address" name="address" value={billingInfo.address} onChange={handleBillingChange} required rows="3"></textarea>
              </div>
              <div className="co-form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" id="pincode" name="pincode" value={billingInfo.pincode} onChange={handleBillingChange} required />
              </div>
              <div className="co-checkbox-group">
                <input type="checkbox" id="useAsShipping" name="useAsShipping" checked={billingInfo.useAsShipping} onChange={handleBillingChange} />
                <label htmlFor="useAsShipping">Use as shipping address</label>
              </div>
            </div>

            {!billingInfo.useAsShipping && (
              <div className="co-form-section">
                <h2>Shipping Information</h2>
                <div className="co-form-group">
                  <label htmlFor="shippingName">Full Name</label>
                  <input type="text" id="shippingName" name="name" value={shippingInfo.name} onChange={handleShippingChange} required />
                </div>
                <div className="co-form-group">
                  <label htmlFor="shippingAddress">Address</label>
                  <textarea id="shippingAddress" name="address" value={shippingInfo.address} onChange={handleShippingChange} required rows="3"></textarea>
                </div>
                <div className="co-form-group">
                  <label htmlFor="shippingPincode">Pincode</label>
                  <input type="text" id="shippingPincode" name="pincode" value={shippingInfo.pincode} onChange={handleShippingChange} required />
                </div>
              </div>
            )}

            <div className="co-form-section">
              <h2>Payment Method</h2>
              <div className="co-payment-options">
                <div className={`co-payment-option ${paymentMethod === 'now' ? 'active' : ''}`} onClick={() => setPaymentMethod('now')}>
                  <div className="co-payment-radio">
                    <div className={`co-radio-dot ${paymentMethod === 'now' ? 'selected' : ''}`}></div>
                  </div>
                  <div className="co-payment-details">
                    <h3>Pay Now</h3>
                    <p>Pay securely with credit/debit card or UPI</p>
                  </div>
                </div>
                <div className={`co-payment-option ${paymentMethod === 'later' ? 'active' : ''}`} onClick={() => setPaymentMethod('later')}>
                  <div className="co-payment-radio">
                    <div className={`co-radio-dot ${paymentMethod === 'later' ? 'selected' : ''}`}></div>
                  </div>
                  <div className="co-payment-details">
                    <h3>Pay Later</h3>
                    <p>Pay in cash after service completion</p>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="co-place-order-btn">Place Order</button>
          </form>
        </div>

        <div className="co-order-summary">
          <h2>Order Summary</h2>
          <div className="co-order-items">
            {orderItems.map(item => (
              <div key={item.id} className="co-order-item">
                <div className="co-item-info">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="co-item-price">₹{item.price}</div>
              </div>
            ))}
          </div>

          <div className="co-order-totals">
            <div className="co-total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="co-total-row"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="co-total-row"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
            <div className="co-total-row co-grand-total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          </div>

          <div className="co-promo-code">
            <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Checkout;
