import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebIndex from "./Website/Components/Home/WebIndex";
import BusSearchResult from "./Website/Components/BusList/BusSearchResult";
import SeaterUI from "./Website/Components/Seats/Seater/Seater";
import SleeperUI from "./Website/Components/Seats/Sleeper/Sleeper";
import SelectSeat from "./Website/Components/SelectSeats/SelectSeat";
import LoginModal from "./Website/Components/UserAccount/LoginModel";
import SignupModal from "./Website/Components/UserAccount/SignUp/SignUp";
import PassengerInfo from "./Website/Components/Passanger/PassengerInfo";
import PaymentInfoPage from "./Website/Components/Payment/PaymentInfo";
import Bookings from "./Website/Components/Bookings/Bookings";
import TestHeader from "./Website/TestCompo/TestHeader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/register" element={<LoginModal/>} />
        <Route path="/login" element={<SignupModal/>} />


        <Route path="/" element={<WebIndex/>} />
        <Route path="/bus-search-result" element={<BusSearchResult/>} />
        <Route path="/seater" element={<SeaterUI/>} />
        <Route path="/sleeper" element={<SleeperUI/>} />
        <Route path="/select-seat" element={<SelectSeat/>} />
        <Route path="/passenger-info" element={<PassengerInfo/>} />
        <Route path="/payment-info" element={<PaymentInfoPage/>} />
        <Route path="/bookings" element={<Bookings/>} />
        


        {/* all test routes */}
        <Route path="/test-header" element={<TestHeader/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
