import react from 'react';

const LocationForm = ({ handleLocationData, verifyChange, verifyChanges, submitData, validationError, disableField }) =>{


    return (
        <div class="container py-5">    
            <div class="row justify-content-center">
                <div class="col-md-6">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                    <h3 class="text-center mb-4 fw-bold">Add Location</h3>
                    <form>

                        <div class="mb-4">
                        <label for="locationCode" class="form-label fw-semibold">Location Short Code</label>
                            <input type="text"  name='location_shortCode' class="form-control rounded-3" id="locationCode" placeholder="Enter short Form eg: Ghy" 
                               onChange={(e)=>{handleLocationData(e), verifyChange(e)}}
                            />
                            {validationError?.location_shortCode && (
                                <div>
                                    {validationError.location_shortCode[0]}
                                </div>
                            )}
                        </div>


                        <div class="mb-4">
                        <label for="locationName" class="form-label fw-semibold">Location Name</label>
                            <input type="text" name='location_name' class="form-control rounded-3" id="locationName" placeholder="Location Name Eg: Guwahati"
                                onChange={handleLocationData}
                                disabled={disableField}
                            />
                            {validationError?.location_name && (
                                <div>
                                    {validationError.location_name[0]}
                                </div>
                            )}
                        </div>

                       

                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary rounded-3 fw-semibold" onClick={submitData}>Add Location</button>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary rounded-3 fw-semibold mt-5" onClick={verifyChanges}>Test</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LocationForm;