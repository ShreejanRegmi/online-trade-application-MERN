import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';
import Spinner from './Spinner';
const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { removeAlertOnClick, alertLoading } = alertContext;

    if (alertLoading) {
        return <Spinner />;
    }
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert =>
            <div key={alert.id} className={`alert alert-${alert.type} alert-dismissible fade show`}>
                {alert.msg}
                <button type="button" className="close" data-dismiss="alert" onClick={() => removeAlertOnClick(alert.id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    )
}

export default Alert