import React from 'react';

const AddBus = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Add New Bus</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Bus Name</label>
          <input type="text" className="form-control" placeholder="Enter bus name" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bus Number</label>
          <input type="text" className="form-control" placeholder="Enter bus number" />
        </div>

        <div className="col-md-6">
          <label className="form-label">From City</label>
          <input type="text" className="form-control" placeholder="Starting point" />
        </div>

        <div className="col-md-6">
          <label className="form-label">To City</label>
          <input type="text" className="form-control" placeholder="Destination" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Departure Time</label>
          <input type="time" className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Arrival Time</label>
          <input type="time" className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Seats Available</label>
          <input type="number" className="form-control" placeholder="Total seats" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price per Seat</label>
          <input type="number" className="form-control" placeholder="Ticket price" />
        </div>

        <div className="col-12">
          <label className="form-label">Bus Type</label>
          <select className="form-select">
            <option>Select bus type</option>
            <option>AC</option>
            <option>Non-AC</option>
            <option>Sleeper</option>
            <option>Seater</option>
          </select>
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary mt-3">Add Bus</button>
        </div>
      </form>
    </div>
  );
}

export default AddBus;
