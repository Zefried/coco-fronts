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
                                <span>Admin Master</span>
                            </a>

                            <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Category Master</h6>
                                    <Link className="collapse-item" to={{pathname:'add-category'}}>Add Category</Link>
                                    <Link className="collapse-item" to={{pathname:'view-category'}}>View Category</Link>
                                </div>

                                 <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Sub Category Master</h6>
                                    <Link className="collapse-item" to={{pathname:'add-sub-category'}}>Add Sub Category</Link>
                                    <Link className="collapse-item" to={{pathname:'view-sub-category'}}>View Sub Category</Link>
                                </div>
                            </div>                                              
                </li>     
            {/* Nav Item - Utilities Collapse Menu */}

            {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fas fa-fw fa-cog" />
                                <span>Admin Product</span>
                            </a>

                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Product Master</h6>
                                    <Link className="collapse-item" to={{pathname:'add-product'}}>Add Product</Link>
                                    <Link className="collapse-item" to={{pathname:'view-product'}}>View product</Link>
                                </div>
                            </div>                                              
                </li>     
            {/* Nav Item - Utilities Collapse Menu */}
                
  

                    
    </>
)

}

export default SideBarItems;