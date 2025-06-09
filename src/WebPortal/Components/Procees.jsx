import React, { useState } from "react";
import FinalCheck from "./subComponents/FinalCheck";
import Header from "./layouts/header";
import PassengerDetails from "./subComponents/PassengerDetails";

const Procees = () => {
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);

  return (
    <div>
      <div className="proceed-con">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <FinalCheck
                showPassengerDetails={showPassengerDetails}
                setShowPassengerDetails={setShowPassengerDetails}
              />
            </div>
            {showPassengerDetails && (
              <div className="col-lg-6">
                <PassengerDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procees;
