import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate';
import ViewVehicleContent from '../page-main-content/ViewVehicleContent';

const ViewVehicle = () => {
    return (
        <AdminMainTemplate PageComponent={ViewVehicleContent} />
    )
}

export default ViewVehicle;
