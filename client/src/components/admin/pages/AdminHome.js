import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AdminSidebar from '../chunks/AdminSidebar';
import QuickReplyFeedback from '../chunks/dashboard/QuickReplyFeedback';
import RecentUsersList from '../chunks/dashboard/RecentUsersList';
import RecentAdsList from '../chunks/dashboard/RecentAdsList';
import axios from 'axios';

import FurnitureContext from '../../../context/furniture/furnitureContext';
import VehicleContext from '../../../context/vehicle/vehicleContext';
import MobileContext from '../../../context/mobile/mobileContext';
import ComputerContext from '../../../context/computer/computerContext';
import Spinner from '../../layout/Spinner';

const AdminHome = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const furnitureContext = useContext(FurnitureContext);
    const { furnitures } = furnitureContext;

    const vehicleContext = useContext(VehicleContext);
    const { vehicles } = vehicleContext;

    const mobileContext = useContext(MobileContext);
    const { mobiles } = mobileContext;

    const computerContext = useContext(ComputerContext);
    const { computers } = computerContext;

    const [state, setState] = useState({
        ads: undefined,
        value: undefined,
        user: undefined,
        feedback: undefined
    })

    const [itemsAll, setItemsAll] = useState({
        items: [],
        itemsLoading: true
    });


    const { ads, value, user, feedback } = state;

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        let source = axios.CancelToken.source();

        (async function () {
            try {
                const users = await axios.get('/getUsers', {
                    cancelToken: source.token
                });
                const feedbackCount = await axios.get('/allFeedbacksNumber', {
                    cancelToken: source.token
                });
                const totalPrice = await axios.get('/totalPriceValue', {
                    cancelToken: source.token
                });
                const adsCount = await axios.get('/totalAdsCount', {
                    cancelToken: source.token
                });
                const numOfUsers = users.data.length;
                const priceValue = totalPrice.data.value;
                const adsValue = adsCount.data.value;

                setState({
                    ads: adsValue,
                    value: priceValue,
                    user: numOfUsers,
                    feedback: feedbackCount.data
                })
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    console.log(error);
                }
            }
        })();

        return () => {
            source.cancel();
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        let adsList = [...furnitures, ...mobiles, ...vehicles, ...computers];
        adsList.sort((a, b) => Date.parse(b.datePosted) - Date.parse(a.datePosted));

        let adsSorted = adsList.slice(0, 10);
        setItemsAll({
            items: adsSorted,
            itemsLoading: false
        });
        //eslint-disable-next-line
    }, [furnitures, vehicles, computers, mobiles])

    const { items, itemsLoading } = itemsAll;

    return (
        <section className="bg-light">
            <div className="container-fluid" style={{ paddingTop: '16vh' }}>
                <div className="row pb-3">

                    <div className="col-sm-2 pl-0 mb-4 mb-sm-0">
                        <AdminSidebar />
                    </div>

                    <div className="col-sm-9"> {/*right main div*/}
                        <div className="row">
                            {/* cards  */}
                            <div className="col-xl-3 col-sm-6 p-2">
                                <div className="card text-secondary each-card">
                                    <div className="card-body d-flex justify-content-between">
                                        <i className="fas fa-shopping-cart fa-3x text-warning"></i>
                                        <div>
                                            <h5 className="card-subtitle">Ads Posted</h5>
                                            <h3 className="card-text">{ads}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer text-secondary font-weight-light">
                                        <i className="fas fa-sync mr-3"></i> Updated Value
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 p-2">
                                <div className="card text-secondary each-card">
                                    <div className="card-body d-flex justify-content-between">
                                        <i className="fas fa-money-bill-alt fa-3x text-success"></i>
                                        <div>
                                            <h5 className="card-subtitle">Total Value</h5>
                                            <h3 className="card-text">Rs. {value && new Intl.NumberFormat().format(value)}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer text-secondary font-weight-light">
                                        <i className="fas fa-sync mr-3"></i> Updated Value
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 p-2">
                                <div className="card text-secondary each-card">
                                    <div className="card-body d-flex justify-content-between">
                                        <i className="fas fa-users fa-3x text-info"></i>
                                        <div>
                                            <h5 className="card-subtitle">Users</h5>
                                            <h3 className="card-text">{user}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer text-secondary font-weight-light">
                                        <i className="fas fa-sync mr-3"></i> Updated Value
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 p-2">
                                <div className="card text-secondary each-card">
                                    <div className="card-body d-flex justify-content-between">
                                        <i className="fas fa-comments fa-3x text-danger"></i>
                                        <div>
                                            <h5 className="card-subtitle">Feedbacks</h5>
                                            <h3 className="card-text">{feedback}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer text-secondary font-weight-light">
                                        <i className="fas fa-sync mr-3"></i> Updated Value
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* new row*/}
                        <div className="row mt-4 mt-lg-5">
                            <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                                <RecentUsersList />
                            </div>
                            <div className="col-12 col-lg-6">
                                {
                                    itemsLoading ? <div className="card">
                                        <div className="card-header bg-white"></div>
                                        <div className="card-body">
                                            <Spinner />
                                        </div>
                                        <div className="card-footer bg-white"></div>
                                    </div> : <RecentAdsList items={items} />
                                }


                            </div>
                        </div>
                        {/* new row end*/}

                        {/*new row */}
                        <div className="row row-third mt-5 align-items-center">
                            <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                                <h6 className="text-center font-weight-bold text-uppercase">Ad Categories</h6>
                                <table className="table table-striped table-bordered table-hover text-center table-light">
                                    <thead>
                                        <tr className="text-secondary">
                                            <th scope="col">#</th>
                                            <th scope="col">Category Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="text-secondary">1</th>
                                            <td>Furniture</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-secondary">2</th>
                                            <td>Mobile Phone</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-secondary">3</th>
                                            <td>Vehicle</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-secondary">4</th>
                                            <td>Computer {"&"} Laptop</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 col-lg-6">
                                {/*quick feedback reply start*/}
                                <QuickReplyFeedback />
                                {/*quick feedback reply end*/}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminHome;
