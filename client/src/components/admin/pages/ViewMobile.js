import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate';
import ViewMobileContent from '../page-main-content/ViewMobileContent';

const ViewMobile = () => {
    return (
        <AdminMainTemplate PageComponent={ViewMobileContent} />
    )
}

export default ViewMobile;
