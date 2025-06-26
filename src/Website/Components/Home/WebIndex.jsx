import React, { useState } from 'react';
import './WebIndex.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WebHeader from '../../Layout/Header';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const WebIndex = () => {
  AuthAction.initiateAuthState();
  const today = new Date().toISOString().split('T')[0];

  const navigate = useNavigate();
  const [storeLocation, setStoreLocation] = useState({
    source: 'Guwahati',
    destination: 'jorhat',
    date: today
  });

  const [activeField, setActiveField] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const handleSearch = async (type, value) => {
    setActiveField(type);
    setStoreLocation(prev => ({ ...prev, [type]: value }));

    if (value.length > 1) {
      try {
        const res = await axios.post(`/api/location-search?type=search&query=${value}`);
        setSearchData(res.data.data);
      } catch (err) {
        console.error(`${type} error:`, err);
      }
    } else {
      setSearchData([]);
    }
  };

  const selectSearchData = (item) => {
    if (activeField) {
      setStoreLocation(prev => ({ ...prev, [activeField]: item.location }));
      setSearchData([]);
    }
  };

  const setTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatted = tomorrow.toISOString().split('T')[0];
    setStoreLocation(prev => ({ ...prev, date: formatted }));
  };

  const handleSubmit = async () => {
    const { source, destination, date } = storeLocation;
    AuthAction.updateState({date_of_journey:date})

    if (!source || !destination || !date) {
      alert("Please select date of journey");
      return;
    }

    if (source === destination) {
      alert("source and destination can't be the same");
      return;
    }

    const payload = { source, destination, date };
    setSelectedData(payload);

    try {
      const res = await axios.post('/api/search-bus', payload);
      if (res.data.status === 200) {
      
        AuthAction.updateState({
          origin: source,
          destination,
          date_of_journey: date,
          parent_route:res.data.data[0].parent_route,
        });
        navigate('/bus-search-result', { state: res.data.data });
      } else if (res.data.message_status === true) {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <WebHeader />
      <section id="hero">
        <div id="heroBanner">
          <div className="container">
            <div className="heroText">
              <h1>No. 1 bus booking app</h1>
            </div>
          </div>
        </div>

        <div className="searchBar">
          <div className="container fieldsWrapper">
            <h4>NR BUS ONLINE BOOKING</h4>
            <div className="inputFieldsBar">
              <div className="generalField">
                {/* From */}
                <div className="field b" id="swapRel">
                  <div className="fieldItems">
                    <i className="ri-bus-line"></i>
                    <div className="labels" style={{ position: 'relative' }}>
                      <label htmlFor="from">From</label>
                      <input
                        className="homeinputBorder"
                        type="text"
                        value={storeLocation.source}
                        onChange={e => handleSearch('source', e.target.value)}
                        placeholder="Roing"
                        onFocus={() => setActiveField('source')}
                        style={{ padding: '10px' }}
                      />
                      {activeField === 'source' && searchData.length > 0 && (
                        <div className="dropdownBox">
                          {searchData.map(item => (
                            <div
                              key={item.id}
                              onClick={() => selectSearchData(item)}
                              className="dropdownItem"
                            >
                              {item.location}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="swap">
                    <i className="ri-arrow-left-line" style={{ color: 'white' }}></i>
                    <i className="ri-arrow-right-line" style={{ color: 'white' }}></i>
                  </div>
                </div>

                {/* To */}
                <div className="field b">
                  <div className="fieldItems">
                    <i className="ri-bus-line"></i>
                    <div className="labels" style={{ position: 'relative' }}>
                      <label htmlFor="to">To</label>
                      <input
                        className="homeinputBorder"
                        type="text"
                        value={storeLocation.destination}
                        onChange={e => handleSearch('destination', e.target.value)}
                        placeholder="Nagaon"
                        onFocus={() => setActiveField('destination')}
                        style={{ padding: '10px', borderRadius: '8px' }}
                      />
                      {activeField === 'destination' && searchData.length > 0 && (
                        <div className="dropdownBox">
                          {searchData.map(item => (
                            <div
                              key={item.id}
                              onClick={() => selectSearchData(item)}
                              className="dropdownItem"
                            >
                              {item.location}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="field">
                  <div className="fieldItems">
                    <i className="ri-calendar-2-line"></i>
                    <div className="labels">
                      <label htmlFor="journeyDate">Date of Journey</label>
                      <input
                        type="date"
                        value={storeLocation.date}
                        onChange={e =>
                          setStoreLocation(prev => ({ ...prev, date: e.target.value }))
                        }
                        style={{ padding: '10px', borderRadius: '8px' }}
                      />
                    </div>
                    <div className="desktopday day">
                      <span className="tmrwText" onClick={setTomorrowDate}>
                        Tomorrow
                      </span>
                    </div>
                  </div>
                  <div className="mobileday day">
                    <span className="todayText" onClick={handleSubmit}>
                      Today
                    </span>
                    <span className="tmrwText" onClick={handleSubmit}>
                      Tomorrow
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="searchBus" id="bus">
                <button onClick={handleSubmit}>
                  <i className="ri-search-line" style={{ color: 'white' }}></i>Search buses
                </button>
              </div>
            </div>
          </div>
        </div>

        <section id="bannerImage"></section>
      </section>
    </>
  );
};

export default WebIndex;
