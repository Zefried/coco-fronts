import react from 'react';
import SideBarItems from './SideBarItems';

const SideBar = () =>{

    return (
        <>
        
            {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                    {/* <i className="fas fa-laugh-wink" /> */}
                    
                    </div>
                    <div className="sidebar-brand-text mx-3">SUNCLAY<sup></sup></div>
                </a>
                
                
                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span></a>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider" />


                    {/* Sidebar items should be changed in the subcomponent. */}
                    <SideBarItems/>
                    {/* ends here */}


                </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default SideBar;