import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchLocation = () => {
    
    const navigate = useNavigate();
    const [storeLocation, setStoreLocation] = useState({ boarding: '', dropping: '', date: '' });
    const [searchData, setSearchData] = useState([]);
    const [activeField, setActiveField] = useState(null);
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

        const payload = {
            boarding: storeLocation.boarding,
            dropping: storeLocation.dropping,
            date: storeLocation.date
        };

        setSelectedData(payload);

        try {
            const res = await axios.post('/api/search-bus', payload);
            if (res.data.status === 200) {
                console.log(res.data.data);
                navigate('/view-bus-list',  { state: res.data.data });
            }else if(res.data.message_status == true){
                alert(res.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', margin: '60px' }}>
            <input
                type="text"
                value={storeLocation.boarding}
                onChange={e => handleSearch('boarding', e.target.value)}
                placeholder="Search for Boarding Location"
                onFocus={() => setActiveField('boarding')}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                value={storeLocation.dropping}
                onChange={e => handleSearch('dropping', e.target.value)}
                placeholder="Search for Dropping Location"
                onFocus={() => setActiveField('dropping')}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
                type="date"
                value={storeLocation.date}
                onChange={e => setStoreLocation(prev => ({ ...prev, date: e.target.value }))}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />

            {searchData.length > 0 && (
                <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                    <p>Suggestions</p>
                    {searchData.map(item => (
                        <div
                            key={item.id}
                            onClick={() => selectSearchData(item.location)}
                            style={{ padding: '5px', cursor: 'pointer' }}
                        >
                            {item.location}
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={handleSubmit}
                style={{
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Search Buses
            </button>

            {selectedData && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h3>Selected Details:</h3>
                    <p>From: {selectedData.boarding}</p>
                    <p>To: {selectedData.dropping}</p>
                    <p>Date: {selectedData.date}</p>
                </div>
            )}
        </div>
    );
};

export default SearchLocation;
