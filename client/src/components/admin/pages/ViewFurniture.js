import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate';
import { ViewFurnitureContent } from '../page-main-content/ViewFurnitureContent';

const ViewFurniture = () => {
    return (
        <AdminMainTemplate PageComponent={ViewFurnitureContent} />
    )
}

export default ViewFurniture;