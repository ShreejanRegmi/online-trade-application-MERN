import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../../../layout/Spinner';
import capitalize from '../../../../utils/capitalize';
import { Link } from 'react-router-dom';

const RecentUsersList = () => {
    const [state, setState] = useState({
        users: [],
        loading: true
    });

    const { users, loading } = state;

    useEffect(() => {
        (async function () {
            const res = await axios.get('/getUsers');
            setState({
                ...state,
                users: res.data,
                loading: false
            });
        })();
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return <div className="card">
            <div className="card-header bg-white"></div>
            <div className="card-body">
                <Spinner />
            </div>
            <div className="card-footer bg-white"></div>
        </div>
    }

    return (
        <div className="card">
            <div className="card-header font-weight-bold text-uppercase bg-white py-3">
                Recently Registered Users
            </div>
            <div className="card-body">
                <div className="scroll-div overflow-auto">
                    <ul className="list-group pr-2">
                        {
                            users && users.map(user =>
                                <li key={user._id} className="list-group-item bg-light border-0 py-1 my-1 d-flex align-items-center">
                                    <div className="icon mr-2">
                                        <i className="fa fa-check bg-info text-white p-1"></i>
                                    </div>
                                    <div className="content">
                                        <span className="text-primary">{capitalize(user.firstname) + ' ' + capitalize(user.lastname)}</span>&ensp;-&ensp;
                                        <i className="fas fa-home text-secondary mr-1"></i>
                                        <span className="text-secondary">{user.address}</span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="card-footer text-muted text-right bg-white">
                <Link to={'/admin/users'} className="text-primary">See all Users <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
        </div>
    )
}

export default RecentUsersList
