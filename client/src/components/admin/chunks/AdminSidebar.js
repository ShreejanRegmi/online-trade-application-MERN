import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="list-group">
            <Link to="/admin/home" className="list-group-item list-group-item-action active"><i className="fas fa-home "></i>&ensp; Dashboard</Link>
            <a className="list-group-item list-group-item-action" data-toggle="collapse" href="#ads-list-sub-menu" ><i className="fas fa-list"></i>&ensp; Ad Listing</a>
            <div className="collapse" id="ads-list-sub-menu">
                <div className="card card-body sub-list-parent p-0 py-lg-1 pl-lg-4">
                    <Link to="/admin/view-furniture" className="list-group-item list-group-item-action sub-list"><i className="fas fa-couch"></i>&emsp; Furnitures</Link>
                    {/* <Link to="/admin/viewItems?c=furniture" className="list-group-item list-group-item-action sub-list"><i className="fas fa-couch"></i>&emsp; Furnitures</Link> */}
                    {/* <Link to="/admin/viewFurniture?c=furniture" className="list-group-item list-group-item-action sub-list"><i className="fas fa-couch"></i>&emsp; Furnitures</Link> */}
                    <Link to="/admin/view-mobile" className="list-group-item list-group-item-action sub-list"><i className="fas fa-mobile"></i>&emsp; Mobiles</Link>
                    {/* <Link to="/admin/viewItems?c=mobile" className="list-group-item list-group-item-action sub-list"><i className="fas fa-mobile"></i>&emsp; Mobiles</Link> */}
                    {/* <Link to="/admin/viewMobile?c=mobile" className="list-group-item list-group-item-action sub-list"><i className="fas fa-mobile"></i>&emsp; Mobiles</Link> */}
                    <Link to="/admin/view-computer" className="list-group-item list-group-item-action sub-list"><i className="fas fa-laptop"></i>&emsp; Computers</Link>
                    {/* <Link to="/admin/viewItems?c=computer" className="list-group-item list-group-item-action sub-list"><i className="fas fa-laptop"></i>&emsp; Computers</Link> */}
                    {/* <Link to="/admin/viewComputer?c=computer" className="list-group-item list-group-item-action sub-list"><i className="fas fa-laptop"></i>&emsp; Computers</Link> */}
                    <Link to="/admin/view-vehicle" className="list-group-item list-group-item-action sub-list"><i className="fas fa-car"></i>&emsp; Vehicles</Link>
                    {/* <Link to="/admin/viewItems?c=vehicle" className="list-group-item list-group-item-action sub-list"><i className="fas fa-car"></i>&emsp; Vehicles</Link> */}
                    {/* <Link to="/admin/viewVehicle?c=vehicle" className="list-group-item list-group-item-action sub-list"><i className="fas fa-car"></i>&emsp; Vehicles</Link> */}
                </div>
            </div>
            <Link to="/admin/feedback" className="list-group-item list-group-item-action"><i className="fas fa-comment"></i>&ensp; Feedback</Link>
            <Link to="/admin/users" className="list-group-item list-group-item-action"><i className="fas fa-user"></i>&ensp; User</Link>
        </div>
    )
}

export default AdminSidebar;
