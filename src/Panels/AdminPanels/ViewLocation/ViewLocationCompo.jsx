import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Default 2 items per page

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  

  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  };



  useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/view-location?page=${currentPage}&limit=${itemsPerPage}`);

                if (res.data.status === 200) {
                setLocations(res.data.listData.data); 
                setTotalPages(res.data.listData.last_page);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
  
    fetchData();
  }, [currentPage, itemsPerPage]);
  


  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className="container py-5">
      <div className="card shadow rounded-4">
        <div className="card-header bg-primary text-white rounded-top-4">
          <h4 className="mb-0 text-center">Bus Locations</h4>
        </div>
        <div className="card-body p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle text-center">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Location</th>
                      <th scope="col">Short Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc, index) => (
                      <tr key={loc.id}>
                        <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                        <td>{loc.location}</td>
                        <td>{loc.short_code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between mt-4">
                <button 
                  className="btn btn-secondary" 
                  onClick={handlePrev} 
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                <div>
                    {/* Calculate the range of pages to display */}
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            
                            // Show page numbers based on the current page
                            const startPage = Math.max(currentPage - 2);
                            const endPage = Math.min(currentPage + 2);

                            // Ensure we only display a subset of pages
                            if (pageNumber >= startPage && pageNumber <= endPage) {
                           
                                return (
                                <button
                                key={pageNumber}
                                className={`btn btn-link`}
                                onClick={() => handlePageChange(pageNumber)}
                                >
                                {pageNumber}
                                </button>
                            );
                            }

                            return null; // Skip rendering the button if it's outside the range
                        })}
                </div>


                <button 
                  className="btn btn-secondary" 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>

              {/* Dropdown for Items Per Page */}
              <div className="card p-2 mt-4" style={{ width: '10rem' }}>
                <p className="mb-0 text-center">Items Per Page</p>
                <div className="d-flex justify-content-end mb-2">
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="form-select form-select-sm mx-2"
                  >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                    <option value={1000}>1000</option>
                  </select>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLocations;
