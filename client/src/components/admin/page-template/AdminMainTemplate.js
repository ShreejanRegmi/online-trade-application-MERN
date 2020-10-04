import React from 'react'
import AdminSidebar from '../chunks/AdminSidebar';

const AdminMainTemplate = ({ PageComponent: Component }) => {
    return (
        <section className="">
            <div className="container-fluid" style={{ paddingTop: '16vh' }}>
                <div className="row pb-3">

                    <div className="col-sm-2 pl-0 mb-4 mb-sm-0">
                        <AdminSidebar />
                    </div>

                    <div className="col-sm-10"> {/*right main div*/}
                        <Component />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminMainTemplate;