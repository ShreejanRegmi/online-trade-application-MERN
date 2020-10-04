import React from 'react'
import $ from 'jquery';

const DeleteItemModal = () => {
    return (
        <div className="modal fade" tabIndex="-1" id="delete-item-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Are you sure?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger">Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { $('#delete-item-modal').modal('hide'); }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteItemModal;