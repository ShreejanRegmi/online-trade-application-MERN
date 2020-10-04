import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import FeedbackContext from '../../context/feedback/feedbackContext';
import Alert from '../layout/Alert';
import capitalize from '../../utils/capitalize';

const FeedbackForm = () => {
    const authContext = useContext(AuthContext);
    const { user, isAuthenticated } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const feedbackContext = useContext(FeedbackContext);
    const { clearMessage, feedbackMessage, addFeedback } = feedbackContext;

    const [feedback, setFeedback] = useState({
        firstname: '',
        lastname: '',
        email: '',
        message: ''
    })

    const { firstname, lastname, email, message } = feedback;

    //useEffect to put firstname and lastname in feedback form
    useEffect(() => {
        if (isAuthenticated) {
            setFeedback({
                firstname: capitalize(user.firstname),
                lastname: capitalize(user.lastname),
                email: user.email,
                message: ''
            })
        } else {
            setFeedback({
                firstname: '',
                lastname: '',
                email: '',
                message: ''
            })
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (feedbackMessage === 'Feedback sent') {
            setAlert('info', feedbackMessage);
            clearMessage();
        }
        //eslint-disable-next-line
    }, [feedbackMessage])

    const onChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (firstname === '' || lastname === '' || message === '' || email === '')
            return;
        addFeedback(feedback);
        setFeedback({
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        })
    }

    return (
        <div className="row p-5 justify-content-center bg-light" id="contact-form">
            <div className="col mb-3">
                <h1 className="font-weight-normal display-4 text-center" style={{ color: '#1497D3' }}>Contact Us</h1>
                <p className="lead text-secondary mt-2 text-center">Feel free to hit us up!</p>
                <div className="row mt-4 justify-content-center">
                    <div className="col-md-7">
                        <Alert />
                        <form onSubmit={onSubmit} >
                            <div className="row my-1 field-required">
                                <label className="mb-3">Firstname</label>
                                <input type="text" name="firstname" className="form-control" value={firstname} onChange={onChange} required></input>
                            </div>
                            <div className="row my-3">
                                <label className="mb-3">Lastname</label>
                                <input type="text" name="lastname" className="form-control" value={lastname} onChange={onChange} required></input>
                            </div>
                            <div className="row my-3">
                                <label className="mb-3">Email</label>
                                <input type="email" name="email" className="form-control" value={email} onChange={onChange} required></input>
                            </div>
                            <div className="row my-3 mb-4 field-required">
                                <label className="mb-3">Message</label>
                                <textarea className="form-control" name="message" rows="3" value={message} onChange={onChange} required></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-info btn-lg">Send Feedback</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackForm
