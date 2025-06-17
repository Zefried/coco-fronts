import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMiddleware from "./Middlewares/adminMiddleware";
import axios from "axios";
import Home from "./Dashboard/Home";
import AddLocation from "./Panels/AdminPanels/AddLocation/LocationCompo";
import ViewLocations from "./Panels/AdminPanels/ViewLocation/ViewLocationCompo";
import AddBus from "./Panels/AdminPanels/AddBus/AddBusCompo";
import ViewBus from "./Panels/AdminPanels/ViewBus/ViewBus";
import WebHome from "./WebPortal/Components/Home";
import Search from "./WebPortal/Components/Search";
import ViewSeat from "./WebPortal/Components/ViewSeat";
import Procees from "./WebPortal/Components/Procees";
import FinalCheck from "./WebPortal/Components/subComponents/FinalCheck";
import QRGenerator from "./Qrgenerator";
import NormalSeat from "./Seats/Seater/NormalSeat";
import SearchLocation from "./TestDoc/SearchLocation";
import WebIndex from "./Website/Home/WebIndex";
import AdcBusList from "./TestDoc/AdcBusList";
import BusList from "./Website/BusSearchList/BusList";
import SeatSelection from "./Website/ViewSeatCompo/ViewSeat";
import Sleeper from "./Seats/Sleeper/Sleeper";
import LoginModal from "./Website/UserAccount/LoginModel";
import SignupModal from "./Website/UserAccount/SignUp/SignUp";
import BoardingDropping from "./Website/Boarding&Dropping/BD";
import PsgInfo from "./Website/PassangerCompo/PsgInfo";
import PayOnBoard from "./Website/PayOnBoardCompo/Pob";
import ViewMyTicket from "./Website/ViewMyTickets/ViewMyTicket";
// import AddProperty from "./Panels/AdminPanels/AddProperty/AddPropertyCompo";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/";

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin panel routes starts here */}
          <Route
            path="/admin"
            element={
              <AdminMiddleware>
                <Home />
              </AdminMiddleware>
            }
          >
            {/* add location master starts here  */}
            <Route path="add-locations" element={<AddLocation></AddLocation>} />

            <Route
              path="view-locations"
              element={<ViewLocations></ViewLocations>}
            />
            {/* ends here */}

            {/* add bus detail master starts here  */}
            <Route path="add-bus" element={<AddBus></AddBus>} />
            <Route path="view-bus" element={<ViewBus></ViewBus>} />
            {/* ends here */}

            {/* add bus detail master starts here  */}
            {/* <Route path="add-property" element={<AddProperty></AddProperty>} />
            <Route path="view-property" element={<AddProperty></AddProperty>} /> */}
            {/* ends here */}
          </Route>
          {/* Admin panel route ends her */}

          <Route path="/" element={<WebIndex />} />
          <Route path="/search" element={<Search />} />
          <Route path="/final" element={<Procees />} />
          <Route path="/qr" element={<QRGenerator />} />



            

          {/* new Routes starts here */}




          <Route path="/seater" element={<NormalSeat/>} />
          <Route path="/sleeper" element={<Sleeper/>} />

          <Route path="/search-location" element={<SearchLocation/>} />
          <Route path="/view-bus-list" element={<AdcBusList/>} />
          
          <Route path="/home" element={<WebIndex/>} />
          <Route path="/view-buses" element={<BusList/>} />
          <Route path="/view-seats" element={<SeatSelection/>} />
    
          <Route path="/login" element={<LoginModal/>}/>
          <Route path="/customer-sign-up" element={<SignupModal/>}/>
          <Route path="/bd" element={<BoardingDropping/>}/>
          <Route path="/psgInfo" element={<PsgInfo/>}/>
          <Route path="/payOnBoard" element={<PayOnBoard/>}/>
          <Route path="/view-my-tickets" element={<ViewMyTicket/>}/>

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
