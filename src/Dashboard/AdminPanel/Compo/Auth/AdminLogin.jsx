import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAuth.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth-resource', {
        type: 'login',
        ...formData
      });

      if (res.data.status == 200) {
        // alert('Login successful');
        let userName = res.data.data.user.name;
        let token = res.data.data.token;
      
        AuthAction.updateState({
          isAuthenticated:true,
          name:userName,
          token:token
        })

          navigate('/admin');
    
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Login</h2>
          <p>Welcome back! Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            {/* <Link to="/forgot-password" className="forgot-password">Forgot password?</Link> */}
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
