import React, { useContext, useState, useEffect } from 'react'
import Alert from '../../../layout/Alert';
import FeedbackContext from '../../../../context/feedback/feedbackContext';
import dateFormat from 'dateformat';
import capitalize from '../../../../utils/capitalize';
import AlertContext from '../../../../context/alert/alertContext';
import $ from 'jquery';
const FeedbackReplyModal = (props) => {
    const { reviewId } = props;

    const feedbackContext = useContext(FeedbackContext);
    const { feedbacks, sendEmail, setReviewed } = feedbackContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [state, setState] = useState({
        loading: true,
        feedback: null
    });

    const [reply, setReply] = useState('');

    const { feedback } = state;

    useEffect(() => {
        feedbacks.forEach(f => {
            if (f._id === reviewId) {
                setState({ feedback: f, loading: false })
                return;
            }
        })
        //eslint-disable-next-line
    }, [feedbacks, reviewId]);

    const onChange = (e) => {
        setReply(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstname: capitalize(feedback.firstname),
            lastname: capitalize(feedback.lastname),
            email: feedback.email,
            dateReceived: dateFormat(feedback.datePosted, "d-mmm-yy"),
            dateReplied: dateFormat(Date.now(), 'd-mmm-yy'),
            message: feedback.message,
            reply
        }
        const res = await sendEmail(data);
        setAlert(res.type, res.msg);
        if (res.type === 'success') {
            setReply('');
            setReviewed(feedback._id);
            setTimeout(() => {
                $('#feedback-reply-modal').modal('hide');
            }, 2000);
        }
    }
    return (
        <div className="modal fade" id="feedback-reply-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title" id="reply-feedback-title">Reply to Feedback</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="text-white">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Alert />
                        <div className="p-4">
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <p>
                                        <i className="fas fa-user mr-2"></i>
                                        <span className="text-info font-weight-bold text-capitalize">{`${feedback && feedback.firstname} `} </span>
                                        <span className="text-info font-weight-bold text-capitalize">{`${feedback && feedback.lastname}`} </span>
                                        <span className="font-weight-light"> {feedback && `(${feedback.email})`} </span>
                                        <span className="text-muted mr-2">writes</span><i className="fas fa-pencil-alt"></i>...
                                    </p>
                                    <p><span className="font-weight-normal text-muted">{feedback && dateFormat(feedback.datePosted, "d-mmm-yy")}</span></p>
                                </div>
                                <div className="div border p-3 bg-light text-secondary font-weight-normal rounded">
                                    {feedback && feedback.message}
                                </div>
                            </div>
                            <div>
                                <p className="text-muted"><i className="font-weight-bold">Reply:</i> </p>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <textarea className="form-control py-2 mb-3" placeholder="..." rows="4" value={reply} onChange={onChange} required></textarea>
                                    <div className="text-center">
                                        <button type="submit" className="btn text-uppercase font-weight-bold text-light bg-info">Reply through Email</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="modal-footer p-2">
                        <button type="button m-0" className="btn btn-secondary" onClick={() => { setReply('') }} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackReplyModal;
