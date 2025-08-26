import { useState, useEffect } from 'react';
import { AuthAction } from '../CustomStateManage/OrgUnits/AuthState';
import axios from 'axios';

const usePagination = (api, perPage = 5) => {
    const { token } = AuthAction.getState('sunState');
    const [data, setData] = useState([]);
    
    const [metadata, setMetadata] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page) => {
        try {
            const res = await axios.get(`${api}?page=${page}&perPage=${perPage}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const responseData = res.data.data || res.data;
            
            // Extract the main data array (try common patterns)
            const items = responseData.orders || responseData.products || responseData.items || responseData.data || [];
            
            // Store the entire response data as metadata
            setMetadata(responseData);
            setData(items);
            setTotalPages(responseData.totalPages || 1);
        } catch (err) {
            console.error('Pagination error:', err);
            setData([]);
            setMetadata({});
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // internal css for now you can clean later
    const PaginationControls = () => (
    <>
        <style>
            {`
                .pagination-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                    gap: 10px;
                }
                
                .pagination-button {
                    padding: 8px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    background-color: #ffffff;
                    color: #374151;
                    font-weight: 500;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }
                
                .pagination-button:hover:not(:disabled) {
                    background-color: #f9fafb;
                    border-color: #9ca3af;
                }
                
                .pagination-button:active:not(:disabled) {
                    transform: translateY(1px);
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }
                
                .pagination-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background-color: #f3f4f6;
                }
                
                .pagination-text {
                    font-weight: 500;
                    color: #4b5563;
                    font-size: 14px;
                    min-width: 120px;
                    text-align: center;
                }
            `}
        </style>
        
        <div className="pagination-container">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="pagination-button"
            >
                Previous
            </button>
            <span className="pagination-text">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    </>
    );


    return { 
        data, 
        metadata, // Return the full metadata including products
        currentPage, 
        totalPages,
        setCurrentPage,
        fetchData: () => fetchData(currentPage),
        PaginationControls 
    };
};

export default usePagination;