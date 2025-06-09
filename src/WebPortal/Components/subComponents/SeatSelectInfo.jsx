import React from "react";

const SeatSelectInfo = () => {
  return (
    <div>
      <div class="seat-info">
        <h5>Seats</h5>

        <div class="seat-colors">
          <div class="row">
            <div class="col-lg-6">
              <div class="seat-color-text">
                <div class="seat-box"></div>
                <p>Available</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="seat-color-text">
                <div class="seat-box seat-grey"></div>
                <p>Available</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="seat-color-text">
                <div class="seat-box seat-red"></div>
                <p>Available</p>
              </div>
            </div>

            <p class="non-refund-text">
              <strong>This booking is non-refundable</strong>
            </p>
            <p class="non-refund">
              This booking falls under the 100% cancellation charges window of
              the cancellation policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectInfo;
