import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import axios from 'axios';
import './Reports.css';
import { FiPackage, FiTruck, FiClock, FiCheckCircle, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
    const { token } = AuthAction.getState('sunState');
    const [reportData, setReportData] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Initial fetch: all orders
    useEffect(() => {
        const fetchAllOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    '/api/admin/reports',
                    { from: null, to: null },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setReportData(res.data.data);
            } catch (err) {
                console.error('Failed to fetch report:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllOrders();
    }, [token]);
    
    // Fetch by date range
    const fetchByDateRange = async () => {
        if (!fromDate || !toDate) {
            alert('Please select both From and To dates');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(
                '/api/admin/reports',
                { from: fromDate, to: toDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReportData(res.data.data);
        } catch (err) {
            console.error('Failed to fetch report:', err);
        } finally {
            setLoading(false);
        }
    };
    
    // Reset filters
    const resetFilters = () => {
        setFromDate('');
        setToDate('');
        // Trigger initial fetch
        const fetchAllOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    '/api/admin/reports',
                    { from: null, to: null },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setReportData(res.data.data);
            } catch (err) {
                console.error('Failed to fetch report:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllOrders();
    };
    
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    
    return (
        <div className="reports-container">
            <div className="reports-header">
                <h1>Reports Dashboard</h1>
                <p>Monitor your store performance and key metrics</p>
            </div>
            
            <div className="date-filter-container">
                <div className="date-filter">
                    <div className="date-input-group">
                        <label htmlFor="fromDate">From</label>
                        <input 
                            type="date" 
                            id="fromDate"
                            value={fromDate} 
                            onChange={e => setFromDate(e.target.value)} 
                        />
                    </div>
                    <div className="date-input-group">
                        <label htmlFor="toDate">To</label>
                        <input 
                            type="date" 
                            id="toDate"
                            value={toDate} 
                            onChange={e => setToDate(e.target.value)} 
                        />
                    </div>
                    <div className="filter-buttons">
                        <button 
                            className="filter-button" 
                            onClick={fetchByDateRange}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Apply Filters'}
                        </button>
                        <button 
                            className="reset-button" 
                            onClick={resetFilters}
                            disabled={loading}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading report data...</p>
                </div>
            ) : reportData ? (
                <div className="stats-grid">
                    <div className="stat-card orders" onClick={() => navigate('/admin/total-orders')}>
                        <div className="stat-icon">
                            <FiPackage />
                        </div>
                        <div className="stat-content">
                            <h3>Total Orders</h3>
                            <p className="stat-value">{reportData.totalOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card shipped" onClick={() => navigate('/admin/shipped-orders')}>
                        <div className="stat-icon">
                            <FiTruck />
                        </div>
                        <div className="stat-content">
                            <h3>Shipped Orders</h3>
                            <p className="stat-value">{reportData.totalShippedOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card pending" onClick={() => navigate('/admin/pending-orders')}>
                        <div className="stat-icon">
                            <FiClock />
                        </div>
                        <div className="stat-content">
                            <h3>Pending Orders</h3>
                            <p className="stat-value">{reportData.totalPendingOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card completed" onClick={() => navigate('/admin/completed-orders')}>
                        <div className="stat-icon">
                            <FiCheckCircle />
                        </div>
                        <div className="stat-content">
                            <h3>Completed Orders</h3>
                            <p className="stat-value">{reportData.totalCompletedOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card products">
                        <div className="stat-icon">
                            <FiShoppingBag />
                        </div>
                        <div className="stat-content">
                            <h3>Total Products</h3>
                            <p className="stat-value">{reportData.totalProducts}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card revenue">
                        <div className="stat-icon">
                            <FiDollarSign />
                        </div>
                        <div className="stat-content">
                            <h3>Total Revenue</h3>
                            <p className="stat-value">{formatCurrency(reportData.totalRevenue)}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-data-container">
                    <p>No report data available. Please try again later.</p>
                </div>
            )}
        </div>
    );
};

export default Reports;