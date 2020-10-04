import React from 'react'

const ConfirmationModal = ({ functiontoexecute }) => {

    return (
        <div className="modal fade" id="confirmation-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Confirm Action</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="text-white">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { functiontoexecute(); }}>Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ConfirmationModal;
