import React, { useState } from 'react';
import './WebIndex.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WebHeader from '../Layout/Header';
import { AuthAction } from '../../ReUsable/CustomStateManagement/OrgUnits/AuthState';


const WebIndex = () => {
   
    AuthAction.initiateAuthState();
    
    const navigate = useNavigate();
    const [storeLocation, setStoreLocation] = useState({ boarding: 'Roing', dropping: 'nagaon', date: '' });
    const [activeField, setActiveField] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    const handleSearch = async (type, value) => {
        setActiveField(type);
        const updatedLocation = { ...storeLocation, [type]: value };
        setStoreLocation(updatedLocation);

        if (value.length > 1) {
            try {
                const res = await axios.get(`/api/search-location?query=${value}`);
                setSearchData(res.data.data);
            } catch (err) {
                console.error(`${type} error:`, err);
            }
        } else {
            setSearchData([]);
        }
    };

    const selectSearchData = (value) => {
        if (activeField) {
            const updatedLocation = { ...storeLocation, [activeField]: value };
            setStoreLocation(updatedLocation);
            setSearchData([]);
        }
    };

    const handleSubmit = async () => {
        
        if (storeLocation.boarding === storeLocation.dropping) {
            alert("Boarding and Dropping can't be the same");
            return;
        }

        const payload = { ...storeLocation };
        setSelectedData(payload);

        try {
            const res = await axios.post('/api/search-bus', payload);
            if (res.data.status === 200) {
                AuthAction.updateState({origin:storeLocation.boarding, destination:storeLocation.dropping})
                navigate('/view-buses', { state: res.data.data });
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
                                <div className="field b" id="swapRel">
                                    <div className="fieldItems">
                                        <i className="ri-bus-line"></i>
                                        <div className="labels" style={{ position: 'relative' }}>
                                            <label htmlFor="from">From</label>
                                            <input
                                                className='homeinputBorder'
                                                type="text"
                                                value={storeLocation.boarding}
                                                onChange={e => handleSearch('boarding', e.target.value)}
                                                placeholder="Roing"
                                                onFocus={() => setActiveField('boarding')}
                                                style={{ padding: '10px'}}
                                            />
                                            {activeField === 'boarding' && searchData.length > 0 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    width: '100%',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '5px',
                                                    zIndex: 1000,
                                                    maxHeight: '200px',
                                                    overflowY: 'auto'
                                                }}>
                                                    {searchData.map(item => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => selectSearchData(item.location)}
                                                            style={{
                                                                padding: '10px',
                                                                cursor: 'pointer',
                                                                borderBottom: '1px solid #eee'
                                                            }}
                                                        >
                                                            {item.location}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="swap">
                                        <i className="ri-arrow-left-line" style={{color:'white'}}></i>
                                        <i className="ri-arrow-right-line" style={{color:'white'}}></i>
                                    </div>
                                </div>

                                <div className="field b">
                                    <div className="fieldItems">
                                        <i className="ri-bus-line"></i>
                                        <div className="labels" style={{ position: 'relative' }}>
                                            <label htmlFor="to">To</label>
                                            <input
                                                className='homeinputBorder'
                                                type="text"
                                                value={storeLocation.dropping}
                                                onChange={e => handleSearch('dropping', e.target.value)}
                                                placeholder="Nagaon"
                                                onFocus={() => setActiveField('dropping')}
                                                style={{ padding: '10px', borderRadius: '8px' }}
                                            />
                                            {activeField === 'dropping' && searchData.length > 0 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    width: '100%',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '5px',
                                                    zIndex: 1000,
                                                    maxHeight: '200px',
                                                    overflowY: 'auto'
                                                }}>
                                                    {searchData.map(item => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => selectSearchData(item.location)}
                                                            style={{
                                                                padding: '10px',
                                                                cursor: 'pointer',
                                                                borderBottom: '1px solid #eee'
                                                            }}
                                                        >
                                                            {item.location}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="fieldItems">
                                        <i className="ri-calendar-2-line"></i>
                                        <div className="labels">
                                            <label htmlFor="journeyDate">Date of Journey</label>
                                            <input
                                                type="date"
                                                value={storeLocation.date}
                                                onChange={e => setStoreLocation(prev => ({ ...prev, date: e.target.value }))}
                                                style={{ padding: '10px', borderRadius: '8px' }}
                                            />
                                        </div>
                                        <div className="desktopday day">
                                            <span className="todayText" onClick={() => handleSubmit()}>Today</span>
                                            <span className="tmrwText" onClick={() => handleSubmit()}>Tomorrow</span>
                                        </div>
                                    </div>
                                    <div className="mobileday day">
                                        <span className="todayText" onClick={() => handleSubmit()}>Today</span>
                                        <span className="tmrwText" onClick={() => handleSubmit()}>Tomorrow</span>
                                    </div>
                                </div>
                            </div>

                            <div className="searchBus" id="bus">
                                <button onClick={handleSubmit}>
                                    <i className="ri-search-line" style={{color:'white'}}></i>Search buses
                                </button>
                            </div>

                            {selectedData && (
                                <div style={{
                                    marginTop: '20px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px'
                                }}>
                                    <h3>Selected Details:</h3>
                                    <p>From: {selectedData.boarding}</p>
                                    <p>To: {selectedData.dropping}</p>
                                    <p>Date: {selectedData.date}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <section id="bannerImage"></section>
            </section>
        </>
    );
};

export default WebIndex;
