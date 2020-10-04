import React, { useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import capitalize from '../../../../utils/capitalize';
import ConfirmButton from './ConfirmButton';
import $ from 'jquery';
import FurnitureContext from '../../../../context/furniture/furnitureContext';
import VehicleContext from '../../../../context/vehicle/vehicleContext';
import MobileContext from '../../../../context/mobile/mobileContext';
import ComputerContext from '../../../../context/computer/computerContext';


const EditModalTableRow = (props) => {
    const { _id, title, description, price, condition, index, type, removeDeletedAd, images } = props;
    const furnitureContext = useContext(FurnitureContext);
    const { deleteFurniture } = furnitureContext;
    const mobileContext = useContext(MobileContext);
    const { deleteMobile } = mobileContext;
    const computerContext = useContext(ComputerContext);
    const { deleteComputer } = computerContext;
    const vehicleContext = useContext(VehicleContext);
    const { deleteVehicle } = vehicleContext;

    const rowRef = useRef(null);

    const hideRow = () => {
        rowRef.current.hidden = true;
    }

    const deleteEvent = (itemId, type) => {
        if (type === 'furniture')
            deleteFurniture(itemId);
        else if (type === 'mobile')
            deleteMobile(itemId);
        else if (type === 'computer')
            deleteComputer(itemId);
        else if (type === 'vehicle')
            deleteVehicle(itemId);
        removeDeletedAd(itemId, type);
        hideRow();
    }

    const editPress = () => {
        $('#edit-products-modal').modal('hide');
        props.history.push(`/editProduct/${type}/${_id}`);
        console.log('product id: ' + _id, ' title: ' + title);
    }

    return (
        <tr ref={rowRef}>
            <th scope="row">{index + 1}</th>
            <td className="">
                <img alt="..." src={"http://localhost:3000/images/" + images[0]} style={{ width: '30%', borderRadius: '10px' }} />
            </td>
            <td>{title}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td className="text-center">
                <span className={"badge " + (condition && condition === "old" ? "badge-warning" : "badge-success") + " p-2"}>{condition && capitalize(condition)}</span>
            </td>
            <td>{type && capitalize(type)}</td>
            <td className=""> {/* p-0 align-middle class was here */}
                <button className="btn btn-info mr-1" onClick={editPress}>Edit</button>
                {/* <button className="btn btn-danger" data-toggle="modal" data-target="#delete-item-modal">Delete</button> */}
                {/* <ConfirmButton dialog={['Delete', 'Are you sure?']} action={deleteEvent(_id, type)}></ConfirmButton> */}
                <ConfirmButton dialog={['Delete', 'Are you sure?']} action={() => { deleteEvent(_id, type) }}></ConfirmButton>
            </td>
        </tr>
    )
}

export default withRouter(EditModalTableRow);