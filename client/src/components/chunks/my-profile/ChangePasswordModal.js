import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import Alert from '../../layout/Alert';
import $ from 'jquery';

const ChangePasswordModal = () => {
    const [formPassword, setFormPassword] = useState({
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
    });

    const authContext = useContext(AuthContext);
    const { editUserPassword, error, clearErrors } = authContext;

    useEffect(() => {
        if (error === 'Please choose a new password' || error === 'Old password does not match') {
            setAlert('danger', error);
            clearErrors();
        }
        else if (error === 'Password successfully updated') {
            setAlert('success', error);
            clearErrors();
            setFormPassword({
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            });
            setTimeout(() => {
                $('#change-password-modal').modal('hide');
            }, 3000)
        }
        //eslint-disable-next-line
    }, [error]);

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { oldPassword, newPassword, newPassword2 } = formPassword;

    const onChange = e => {
        setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (oldPassword === '' || newPassword === '' || newPassword2 === '')
            return;
        if (newPassword !== newPassword2) {
            setAlert('danger', 'Confirmation password does not match');
            return;
        }
        editUserPassword({ password: newPassword, oldPassword });
    }


    return (
        <div className="modal fade" id="change-password-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title" id="change-password-title">Change Password</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="text-white">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Alert />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="old-password" className="col-form-label">Old Password:</label>
                                <input type="password" className="form-control" name="oldPassword" id="old-password" minLength="6" value={oldPassword} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-password" className="col-form-label">New Password:</label>
                                <input type="password" className="form-control" name="newPassword" id="new-password" minLength="6" value={newPassword} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-password2" className="col-form-label">Confirm Password:</label>
                                <input type="password" className="form-control" name="newPassword2" id="new-password2" minLength="6" value={newPassword2} onChange={onChange} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Update Password</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ChangePasswordModal);
