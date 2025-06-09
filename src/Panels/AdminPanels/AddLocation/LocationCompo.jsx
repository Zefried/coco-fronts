import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationForm from './LocationForm';

const AddLocation = () => {



    const [locationData, setLocationData] = useState({});
    const [validationError, setValidationError] = useState({});
    const [disableField, setDisableField] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleLocationData = (e) => {
        const { name, value } = e.target;
        setLocationData((param) => ({ ...param, [name]: value }));
    }

    const verifyChange = async (e) => {
        const { name, value } = e.target;

        if (value.length > 1) {
            try {
                const res = await axios.get(`/api/verify-location?${name}=${value}`);

                if (res.data.status === 200) {
                    setDisableField(true);

                } else if (res.data.status === 404) {
                    // no matching location therefore enabling the field again
                    setDisableField(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const verifyChanges = async (e) => {
       
        e.preventDefault();
        const { name, value } = e.target;

     
            try {
                const res = await axios.get(`/api/test`);

                if (res.data.status === 200) {
                    setDisableField(true);

                } else if (res.data.status === 404) {
                    // no matching location therefore enabling the field again
                    setDisableField(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        
    }

    const submitData = async (e) => {
        e.preventDefault(); 

        try {
            await axios.get('/sanctum/csrf-cookie'); // Get CSRF token

            const res = await axios.post('/api/add-location', locationData); // POST request to add location

            if (res.data.status === 201) {
                setAlertMessage(<div className="alert alert-primary" role="alert">{res.data.message}</div>);

                setTimeout(() => {
                    setAlertMessage(null); // Hide the alert after 2 seconds
                }, 2000);

            } else if (res.data.status === 400) {
                setValidationError({ ...res.data.errors });
            }

            // Reset form after successful submission
            setTimeout(() => {
                setValidationError({});
            }, 2000);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {alertMessage} {/* Render alert dynamically */}

            <LocationForm
                handleLocationData={handleLocationData}
                verifyChange={verifyChange}
                verifyChanges={verifyChanges}
                submitData={submitData}
                validationError={validationError}
                disableField={disableField}
            />
          
        </>
    );
}

export default AddLocation;
