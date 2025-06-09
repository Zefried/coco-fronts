import { Link, Outlet } from "react-router-dom";
import Footer from "./components/footer";
import SideBar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <>
      <div>
        <div id="wrapper">
          <SideBar />

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />

              <div className="container-fluid">
                {/* mount the child components here */}
                <Outlet />
              </div>
            </div>

            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
