import React, { useContext, useEffect, useState } from 'react'
import VehicleContext from '../../../context/vehicle/vehicleContext';
import $ from 'jquery';
import AdminVehicleTableRow from '../chunks/admin-vehicle/AdminVehicleTableRow';
import AuthContext from '../../../context/auth/authContext';
import ConfirmationModal from '../../layout/ConfirmationModal';
import Alert from '../../layout/Alert';
import AlertContext from '../../../context/alert/alertContext';

$.DataTable = require('datatables.net-bs4');

const ViewVehicleContent = () => {
    const vehicleContext = useContext(VehicleContext);
    const { vehicles, deleteVehicleAdmin, clearVehicleMessage } = vehicleContext;

    const [itemsLoaded, setItemsLoaded] = useState(false);

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [deleteId, setDeleteId] = useState(undefined);

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (itemsLoaded) {
            $('table').DataTable();
        }
        // eslint-disable-next-line
    }, [itemsLoaded]);

    const deleteOneVehicle = async () => {
        const deleted = await deleteVehicleAdmin(deleteId);
        if (deleted) {
            // window.location.reload(true);
            setAlert('success', `One listing for Vehicle deleted`);
            clearVehicleMessage();
        } else {
            setAlert('danger', `Failed to delete listing`);
        }
        setDeleteId(undefined);
    }

    return (
        <>
            <ConfirmationModal functiontoexecute={deleteOneVehicle} />
            <div className="row">
                <div className="col">
                    <p className="lead font-weight-light" style={{ fontSize: '2.3rem' }}>Manage Vehicle</p>
                    <div className="div border">
                        <div className="border-bottom p-3">
                            <p className="d-flex align-items-center m-0">
                                <i className="fas fa-cog"></i>&ensp;<span className="lead text-uppercase">Listings</span>
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
                                                <th scope="col">Image</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Brand</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold From</th>
                                                <th scope="col">KM Driven</th>
                                                <th scope="col">MFGD Year</th>
                                                <th scope="col">Condition</th>
                                                <th scope="col">Posted By</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Archived</th>
                                                <th scope="col">User Archived</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                vehicles.length === 0 ? <tr><td colSpan="15">No data available</td></tr> :
                                                    vehicles && vehicles.map((p, i, array) => (
                                                        <AdminVehicleTableRow key={p._id} data={p} index={i} setItemsLoaded={setItemsLoaded}
                                                            length={array.length} setDeleteId={setDeleteId} />
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

export default ViewVehicleContent;
