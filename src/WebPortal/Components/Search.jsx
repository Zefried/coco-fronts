import React from "react";
import Header from "./layouts/header";
import SideBar from "./layouts/sideBar";
import SearchTop from "./subComponents/SearchTop";
import BusContent from "./subComponents/BusContent";

function Search() {
  return (
    <>
      <Header></Header>
      <SearchTop />
      <div class="main-section">
        <div class="row">
          <div class="col-lg-3">
            <SideBar></SideBar>
          </div>
           <div class="col-lg-9">
            <BusContent></BusContent>
           </div>
        </div>
      </div>
    </>
  );
}

export default Search;
