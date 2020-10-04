import React from 'react'
import dateFormat from 'dateformat';

export const FeedbackTableRow = (props) => {
    const { firstname, lastname, email, message, datePosted, reviewed, id, index, setOneReviewed, setDeleteId, setReviewId } = props;

    const markSeenEvent = () => {
        setOneReviewed(id);
    }

    const deleteEvent = () => {
        setDeleteId(id);
    }

    const replyClickEvent = () => {
        setReviewId(id);
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td className="text-capitalize">{firstname}</td>
            <td className="text-capitalize">{lastname}</td>
            <td className="font-italic">{email}</td>
            <td>{message}</td>
            <td>{dateFormat(datePosted, "d-mmm-yy")}</td>
            <td className="font-weight-bold">{reviewed.toString()}</td>
            <td className="">
                <div className="dropleft">
                    <button className="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Action</button>
                    <div className="dropdown-menu dropdown-feedback-reply">
                        {reviewed === false ? <li className="dropdown-item py-0 cursor-pointer" data-toggle="modal" data-target="#feedback-reply-modal" onClick={replyClickEvent}><i className="fas fa-reply"></i>&emsp;Reply</li> : null}
                        <li className="dropdown-item py-0 cursor-pointer" data-toggle="modal" data-target="#confirmation-modal" onClick={deleteEvent}><i className="fas fa-trash-alt"></i>&emsp;Delete</li>
                        {reviewed === false ? <li className="dropdown-item py-0 cursor-pointer" onClick={markSeenEvent}><i className="fas fa-check-double"></i>&emsp;Mark Seen</li> : null}
                    </div>
                </div>
            </td>
        </tr>
    )
}
