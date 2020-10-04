import React, { useEffect, useState, useContext } from 'react'
import dateFormat from 'dateformat';
import axios from 'axios';
import FurnitureContext from '../../../../context/furniture/furnitureContext';

const AdminFurnitureTableRow = (props) => {
    const furnitureContext = useContext(FurnitureContext);
    const { toggleFurnitureArchived } = furnitureContext;

    const { data, index, length, setItemsLoaded, setDeleteId } = props;

    const [adderName, setAdderName] = useState('');


    //make user get funciton
    useEffect(() => {
        (async function () {
            const res = await axios.get('/userName/' + data.addedBy);
            setAdderName(res.data);
            if (index + 1 === length) {
                setItemsLoaded(true);
            }
        })();
        //eslint-disable-next-line
    }, []);

    const clickEvent = () => {
        toggleFurnitureArchived(data._id);
    }

    const clickDeleteEvent = () => {
        setDeleteId(data._id);
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>
                <img alt="..." src={"http://localhost:3000/images/" + data.images[0]} style={{width: '50%', borderRadius: '10px'}} />
            </td>
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
                        <li className="dropdown-item cursor-pointer" data-toggle="modal" data-target="#confirmation-modal" onClick={clickDeleteEvent}><i className="fas fa-trash-alt"></i>&emsp;Delete</li>
                        <li className="dropdown-item cursor-pointer" onClick={clickEvent}>
                            {data.archived ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}&emsp;Archive
                        </li>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default AdminFurnitureTableRow
