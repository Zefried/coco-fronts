import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebIndex from "./Website/Components/Home/WebIndex";
import BusSearchResult from "./Website/Components/BusList/BusSearchResult";
import SeaterUI from "./Website/Components/Seats/Seater/Seater";
import SleeperUI from "./Website/Components/Seats/Sleeper/Sleeper";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<WebIndex/>} />
        <Route path="/bus-search-result" element={<BusSearchResult/>} />
        <Route path="/seater" element={<SeaterUI/>} />
        <Route path="/sleeper" element={<SleeperUI/>} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
