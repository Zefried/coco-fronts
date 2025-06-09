import React from 'react';

const ViewBus = () => {
  const busImages = [
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo=',
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo=',
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo=',
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo=',
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo=',
    'https://media.gettyimages.com/id/135327019/photo/white-passenger-bus.jpg?s=612x612&w=gi&k=20&c=oOnC5CrZI23rf4fy3EvKzL0LsJ3nBkDXJfEmrSN0qPo='
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4">View Buses</h2>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <input type="text" className="form-control" placeholder="Search by bus name or number..." />
        <button className="btn btn-primary" type="button">Search</button>
      </div>

      {/* Bus List */}
      <div className="row g-4">
        {busImages.map((imgUrl, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={imgUrl}
                className="card-img-top"
                alt="Bus"
              />
              <div className="card-body">
                <h5 className="card-title">Bus Name {idx + 1}</h5>
                <p className="card-text">
                  <strong>Number:</strong> ABC-{100 + idx} <br />
                  <strong>Route:</strong> City A ➔ City B <br />
                  <strong>Seats:</strong> {30 + idx} <br />
                  <strong>Type:</strong> AC Sleeper
                </p>
              </div>
              <div className="card-footer text-end">
                <button className="btn btn-outline-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-5 d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ViewBus;
