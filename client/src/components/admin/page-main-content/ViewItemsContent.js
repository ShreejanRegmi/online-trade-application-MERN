import React, { useContext, useEffect, useState } from 'react'
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import FurnitureContext from '../../../context/furniture/furnitureContext';
import MobileContext from '../../../context/mobile/mobileContext';
import VehicleContext from '../../../context/vehicle/vehicleContext';
import ComputerContext from '../../../context/computer/computerContext';
import AdminItemRow from '../chunks/AdminItemRow';
import $ from 'jquery';

$.DataTable = require('datatables.net-bs4');

const ViewItemsContent = (props) => {
    const parsed = queryString.parse(props.location.search);
    const itemCat = parsed.c;

    const furnitureContext = useContext(FurnitureContext);
    const { furnitures } = furnitureContext;

    const mobileContext = useContext(MobileContext);
    const { mobiles } = mobileContext;

    const vehicleContext = useContext(VehicleContext);
    const { vehicles } = vehicleContext;

    const computerContext = useContext(ComputerContext);
    const { computers } = computerContext;

    // const [itemsLoaded, setItemsLoaded] = useState(false);

    let setItemsLoaded = () => {

    }

    // useEffect(() => {
    //     console.log(itemCat + ' mounted');
    //     return () => {
    //         console.log(itemCat + ' unmounted');
    //         $('table').DataTable().destroy();
    //     }
    // }, [itemCat]);

    useEffect(() => {
        if (itemCat === 'furniture') {
            if (furnitures.length > 0) {
                // if (itemsLoaded)
                $('table').DataTable();
            }
        }

        // eslint-disable-next-line
    }, [furnitures, itemCat]);

    useEffect(() => {
        if (itemCat === 'computer') {
            if (computers.length > 0) {
                // if (itemsLoaded)
                $('table').DataTable();
            }
        }
        // eslint-disable-next-line
    }, [computers, itemCat]);

    useEffect(() => {
        if (itemCat === 'mobile') {
            if (mobiles.length > 0) {
                // if (itemsLoaded)
                $('table').DataTable();
            }
        }
        // eslint-disable-next-line
    }, [mobiles, itemCat]);

    useEffect(() => {
        if (itemCat === 'vehicle') {
            if (vehicles.length > 0) {
                // if (itemsLoaded)
                $('table').DataTable();
            }
        }
        // eslint-disable-next-line
    }, [vehicles, itemCat]);


    const headings = {
        furniture: ['S.N', 'Image', 'Title', 'Description', 'Price', 'Sold From', 'Condition', 'Posted By', 'Date', 'Archived', 'User Archived', 'Action'],
        mobile: ['S.N', 'Image', 'Title', 'Description', 'Brand', 'Price', 'Sold From', 'Condition', 'Posted By', 'Date', 'Archived', 'User Archived', 'Action'],
        vehicle: ['S.N', 'Image', 'Title', 'Description', 'Brand', 'Price', 'Sold From', 'Condition', 'KM Driven', 'MFGD Year', 'Posted By', 'Date', 'Archived', 'User Archived', 'Action'],
        computer: ['S.N', 'Image', 'Title', 'Description', 'Brand', 'Price', 'Sold From', 'Condition', 'Posted By', 'Date', 'Archived', 'User Archived', 'Action']
    }
    return (
        <div className="row">
            <div className="col">
                <p className="lead font-weight-light" style={{ fontSize: '2.3rem' }}>Manage <span className="text-capitalize">{itemCat + 's'}</span></p>
                <div className="div border">
                    <div className="border-bottom p-3">
                        <p className="d-flex align-items-center m-0">
                            <i className="fas fa-cog"></i>&ensp;<span className="lead text-uppercase">Listings</span>
                        </p>
                    </div>
                    <div className="p-3">
                        <div className="mt-3"> {/*Div containing table*/}
                            <div className="table-responsive">
                                <table className="table table-bordered table-sm table-hover text-center" style={{ minWidth: '1000px' }}>
                                    <thead>
                                        <tr>
                                            {headings[itemCat].map(p => <th key={p} scope="col">{p}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemCat === "furniture" ? (
                                                furnitures.length === 0 ? <tr><td colSpan="12">No data available</td></tr> :
                                                    furnitures && furnitures.map((p, i, array) => (
                                                        <AdminItemRow key={p._id} itemCat={itemCat} data={p} index={i} setItemsLoaded={setItemsLoaded}
                                                            arrayLength={array.length} />
                                                    ))
                                            )
                                                : itemCat === "mobile" ? (
                                                    mobiles.length === 0 ? <tr><td colSpan="13">No data available</td></tr> :
                                                        mobiles && mobiles.map((p, i, array) => (
                                                            <AdminItemRow key={p._id} itemCat={itemCat} data={p} index={i} setItemsLoaded={setItemsLoaded}
                                                                arrayLength={array.length} />
                                                        ))
                                                ) :
                                                    itemCat === "vehicle" ? (
                                                        vehicles.length === 0 ? <tr><td colSpan="15">No data available</td></tr> :
                                                            vehicles && vehicles.map((p, i, array) => (
                                                                <AdminItemRow key={p._id} itemCat={itemCat} data={p} index={i} setItemsLoaded={setItemsLoaded}
                                                                    arrayLength={array.length} />
                                                            ))
                                                    ) :
                                                        itemCat === "computer" ? (
                                                            computers.length === 0 ? <tr><td colSpan="15">No data available</td></tr> :
                                                                computers && computers.map((p, i, array) => (
                                                                    <AdminItemRow key={p._id} itemCat={itemCat} data={p} index={i} setItemsLoaded={setItemsLoaded}
                                                                        arrayLength={array.length} />
                                                                ))
                                                        ) : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(ViewItemsContent);
