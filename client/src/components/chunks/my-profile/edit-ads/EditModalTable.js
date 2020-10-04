import React from 'react'
import EditModalTableRow from './EditModalTableRow';

const EditModalTable = ({ items: { addedFurnitures,
    addedVehicles,
    addedMobiles,
    addedComputers }, removeDeletedAd }) => {

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Condition</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...addedFurnitures, ...addedMobiles, ...addedVehicles, ...addedComputers].map(({ _id, title, description, price, condition, type, images }, i) => (
                        <EditModalTableRow key={_id} _id={_id} title={title} description={description} price={price} condition={condition} type={type} index={i}
                            removeDeletedAd={removeDeletedAd} images={images}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EditModalTable;