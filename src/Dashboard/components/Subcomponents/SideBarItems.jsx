import react from 'react';
import { Link } from 'react-router-dom';


const SideBarItems = () =>{

return (
    <> 
            {/* Heading */}
            <div className="sidebar-heading">
                Interface
            </div>

            {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i className="fas fa-fw fa-cog" />
                                <span>Property Master</span>
                            </a>

                            <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Add Masters</h6>
                                    <Link className="collapse-item" to={{pathname:'add-property'}}>Add Property</Link>
                                    <Link className="collapse-item" to={{pathname:'view-property'}}>View Property</Link>
                                </div>
                            </div>                                              
                </li>
                
            {/* Nav Item - Utilities Collapse Menu */}
                
  

                    
    </>
)

}

export default SideBarItems;