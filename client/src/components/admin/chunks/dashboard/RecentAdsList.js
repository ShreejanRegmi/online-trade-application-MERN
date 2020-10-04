import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
const RecentAdsList = ({ items }) => {
    return (
        <div className="card">
            <div className="card-header font-weight-bold text-uppercase bg-white py-3">
                Recently Listed Ads
            </div>
            <div className="card-body">
                <div className="scroll-div overflow-auto">
                    <ul className="list-group pr-2">
                        {
                            items && items.map(i =>
                                <Fragment>
                                    {
                                    (!i.archived && !i.userArchived) ?
                                        <li key={i._id} className="list-group-item bg-light border-0 py-1 my-1 d-flex align-items-center">
                                            <div className="icon mr-2">
                                                <i className="fa fa-check bg-info text-white p-1"></i>
                                            </div>
                                            <div className="content">
                                                <span className="text-primary mr-3">{i.title}&emsp;-</span>
                                                <i className="fas fa-home text-secondary mr-1"></i>
                                                <span className="text-secondary mr-1">{i.soldFrom} - </span>
                                                <i className="fas fa-list text-secondary mr-1"></i>
                                                <span className="text-secondary text-capitalize">{i.type}</span>
                                            </div>
                                        </li> : null
                                    }
                                </Fragment>
                            )
                        }



                    </ul>
                </div>
            </div>
            <div className="card-footer text-muted bg-white d-flex justify-content-between align-items-center">
                <div className="align-middle">
                    <span className="text-secondary">See all Listings <i className="fas fa-arrow-right"></i></span>
                </div>
                <div>
                    <Link to={'/admin/view-furniture'} className="mx-2 text-primary">Furnitures</Link>
                    <Link to={'/admin/view-mobile'} className="mx-2 text-primary">Mobiles</Link>
                    <Link to={'/admin/view-computer'} className="mx-2 text-primary">Vehicles</Link>
                    <Link to={'/admin/view-vehicle'} className="mx-2 text-primary">Computers</Link>
                </div>
            </div>
        </div>
    )
}

export default RecentAdsList
