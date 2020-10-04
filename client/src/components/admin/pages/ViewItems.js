import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate';
import ViewItemsContent from '../page-main-content/ViewItemsContent';

const ViewItems = (props) => {
    return (
        <AdminMainTemplate PageComponent={ViewItemsContent} />

    )
}

export default ViewItems
