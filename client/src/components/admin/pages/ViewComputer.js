import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate';
import ViewComputerContent from '../page-main-content/ViewComputerContent';

const ViewComputer = () => {
    return (
        <AdminMainTemplate PageComponent={ViewComputerContent} />
    )
}

export default ViewComputer;
