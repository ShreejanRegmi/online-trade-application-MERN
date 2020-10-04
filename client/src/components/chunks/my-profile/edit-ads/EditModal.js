import React from 'react'
import Alert from '../../../layout/Alert';
import EditModalTable from './EditModalTable';

const EditModal = ({ items, removeDeletedAd }) => {
    return (
        <div className="modal fade" id="edit-products-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title" id="change-password-title">Edit Posted Ads</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="text-white">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Alert />
                        <EditModalTable items={items} removeDeletedAd={removeDeletedAd}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;