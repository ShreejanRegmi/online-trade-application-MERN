import React from 'react'
import AdminMainTemplate from '../page-template/AdminMainTemplate'
import FeedbackPageContent from '../page-main-content/FeedbackPageContent';

const Feedback = () => {
    return (
        <AdminMainTemplate PageComponent={FeedbackPageContent}/>
    )
}

export default Feedback;