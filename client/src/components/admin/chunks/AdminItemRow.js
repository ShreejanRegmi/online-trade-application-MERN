import React, { useState, useEffect } from 'react'
import dateFormat from 'dateformat';
import axios from 'axios';

const AdminItemRow = (props) => {
    const {data, index, setItemsLoaded, arrayLength } = props;

    const [adderName, setAdderName] = useState('');

    useEffect(() => {
        (async function () {
            const res = await axios.get('/userName/' + data.addedBy);
            setAdderName(res.data);
            if (index + 1 === arrayLength) {
                setItemsLoaded(true);
            }
        })();
        //eslint-disable-next-line
    }, []);

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td><i>Image</i></td>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.price}</td>
            <td>{data.soldFrom}</td>
            <td>{data.condition}</td>
            <td>{adderName}</td>
            <td>{dateFormat(data.datePosted, "d-mmm-yy")}</td>
            <td>{data.archived.toString()}</td>
            <td>{data.userArchived.toString()}</td>
            <td>
                <div className="dropleft">
                    <button className="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Action</button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#a"><i className="fas fa-trash-alt"></i>&emsp;Delete</a>
                        <a className="dropdown-item" href="#a"><i className="far fa-check-square"></i><i className="far fa-square"></i>&emsp;Archive</a>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default AdminItemRow
