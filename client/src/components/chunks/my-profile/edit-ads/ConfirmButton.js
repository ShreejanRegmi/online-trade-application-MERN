import React, { useState, useEffect } from 'react'

const ConfirmButton = ({ action, dialog }) => {
    const [timesPressed, setTimePressed] = useState(0);

    const onPress = () => {
        setTimePressed(timesPressed + 1);
    }

    useEffect(() => {
        if (timesPressed === 2) {
            action();
            setTimePressed(0);
        }
        //eslint-disable-next-line
    }, [timesPressed]);
    return (
        <button onClick={onPress} className="btn btn-danger">
            {dialog[timesPressed]}
        </button>
    )
}

export default ConfirmButton;