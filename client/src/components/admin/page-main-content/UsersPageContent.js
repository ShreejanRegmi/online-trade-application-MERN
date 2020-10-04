import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import AdminUsersTableRow from '../chunks/admin-users/AdminUsersTableRow';
import AuthContext from '../../../context/auth/authContext';
import $ from 'jquery';

import FurnitureContext from '../../../context/furniture/furnitureContext';
import MobileContext from '../../../context/mobile/mobileContext';
import VehicleContext from '../../../context/vehicle/vehicleContext';
import ComputerContext from '../../../context/computer/computerContext';
import Alert from '../../layout/Alert';
import AlertContext from '../../../context/alert/alertContext';
import ConfirmationModal from '../../layout/ConfirmationModal';


$.DataTable = require('datatables.net-bs4');


const UsersPageContent = () => {
    const [users, setUsers] = useState([]);

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const furnitureContext = useContext(FurnitureContext);
    const { removeUserFurnitures, toggleUserFurnituresArchived } = furnitureContext;
    const mobileContext = useContext(MobileContext);
    const { removeUserMobiles, toggleUserMobilesArchived } = mobileContext;
    const vehicleContext = useContext(VehicleContext);
    const { removeUserVehicles, toggleUserVehiclesArchived } = vehicleContext;
    const computerContext = useContext(ComputerContext);
    const { removeUserComputers, toggleUserComputersArchived } = computerContext;

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        let source = axios.CancelToken.source();

        (async function () {
            try {
                const result = await axios.get('/getUsers', {
                    cancelToken: source.token
                });
                setUsers(result.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                } else { console.log(error); }
            }
        })();

        return () => {
            source.cancel();
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            $('table').DataTable();
        }
        // eslint-disable-next-line
    }, [users]);

    const [deleteId, setDeleteId] = useState(undefined);

    const setOneArchived = (userId, newUserData) => {
        setUsers(users.map(u =>
            u._id === userId ? newUserData : u
        ))
        const boolState = newUserData.archived;
        toggleUserFurnituresArchived(userId, boolState);
        toggleUserComputersArchived(userId, boolState);
        toggleUserMobilesArchived(userId, boolState);
        toggleUserVehiclesArchived(userId, boolState);
    }

    const deleteOneUser = async () => {
        try {
            const res = await axios.delete(`/user/${deleteId}`);
            setUsers(users.filter(
                u => u._id !== deleteId
            ))
            removeUserFurnitures(deleteId);
            removeUserComputers(deleteId);
            removeUserMobiles(deleteId);
            removeUserVehicles(deleteId);
            setAlert('success', `One user and posted ${res.data.deletedAdsNo} ads were deleted`);
            // setAlert('success', `One user and posted 4 ads were deleted`);
            setDeleteId(undefined);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ConfirmationModal functiontoexecute={deleteOneUser} />
            <div className="row">
                <div className="col">
                    <p className="lead font-weight-light" style={{ fontSize: '2.3rem' }}>Manage Users</p>
                    <div className="div border">
                        <div className="border-bottom p-3">
                            <p className="d-flex align-items-center m-0">
                                <i className="fas fa-cog"></i>&ensp;<span className="lead text-uppercase">USERS</span>
                            </p>
                        </div>
                        <div className="p-3">
                            <Alert />
                            <div className="mt-3"> {/*Div containing table*/}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm table-hover text-center" style={{ minWidth: '1000px' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">S.N</th>
                                                {/* <th scope="col">Image</th> */}
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Bio</th>
                                                <th scope="col">Social Media</th>
                                                <th scope="col">Joined</th>
                                                <th scope="col">Archived</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length === 0 ? <tr><td colSpan="8">No data available</td></tr> : null}
                                            {
                                                users && users.map((user, i) => (
                                                    <AdminUsersTableRow key={user._id} index={i} user={user} setOneArchived={setOneArchived}
                                                        deleteOneUser={deleteOneUser} setDeleteId={setDeleteId} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UsersPageContent;
