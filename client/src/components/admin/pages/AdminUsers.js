import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate'
import UserPageContent from '../page-main-content/UsersPageContent';

const AdminUsers = () => {
    return (
        <AdminMainTemplate PageComponent={UserPageContent} />
    )
}

export default AdminUsers;