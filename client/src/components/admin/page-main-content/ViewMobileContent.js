import React, { useContext, useEffect, useState } from 'react'
import MobileContext from '../../../context/mobile/mobileContext';
import $ from 'jquery';
import AdminMobileTableRow from '../chunks/admin-mobile/AdminMobileTableRow';
import AuthContext from '../../../context/auth/authContext';
import ConfirmationModal from '../../layout/ConfirmationModal';
import AlertContext from '../../../context/alert/alertContext';
import Alert from '../../layout/Alert';

$.DataTable = require('datatables.net-bs4');

const ViewMobileContent = () => {
    const mobileContext = useContext(MobileContext);
    const { mobiles, deleteMobileAdmin, clearMobileMessage } = mobileContext;

    const [itemsLoaded, setItemsLoaded] = useState(false);

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

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

    const deleteOneMobile = async () => {
        const deleted = await deleteMobileAdmin(deleteId);
        if (deleted) {
            // window.location.reload(true);
            setAlert('success', `One listing for mobile deleted`);
            clearMobileMessage();
        } else {
            setAlert('danger', `Failed to delete listing`);
        }
        setDeleteId(undefined);
    }

    return (
        <>
            <ConfirmationModal functiontoexecute={deleteOneMobile}/>
            <div className="row">
                <div className="col">
                    <p className="lead font-weight-light" style={{ fontSize: '2.3rem' }}>Manage Mobile</p>
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

                                                mobiles.length === 0 ? <tr><td colSpan="13">No data available</td></tr> :
                                                    mobiles && mobiles.map((p, i, array) => (
                                                        <AdminMobileTableRow key={p._id} data={p} index={i} setItemsLoaded={setItemsLoaded}
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

export default ViewMobileContent;
