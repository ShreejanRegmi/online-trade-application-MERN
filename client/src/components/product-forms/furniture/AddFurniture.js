import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../context/auth/authContext';
import FurnitureContext from '../../../context/furniture/furnitureContext';
import AlertContext from '../../../context/alert/alertContext';
import Alert from '../../layout/Alert';
import axios from 'axios';


const AddFurniture = ({ match }) => {
    const pid = match.params.id;
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const furnitureContext = useContext(FurnitureContext);
    const { furnitureMessage, addFurniture, clearFurnitureMessage, editFurniture } = furnitureContext;


    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const [furniture, setFurniture] = useState({
        title: '',
        description: '',
        price: '',
        soldFrom: '',
        condition: 'new',
        images: []
    })

    useEffect(() => {
        if (pid) {
            (async function (id) {
                try {
                    const p = await axios.get(`/furniture/${id}`);
                    setFurniture({ ...p.data });
                } catch (error) {
                    console.log(error);
                }
            })(pid);
        } else {
            setFurniture({
                title: '',
                description: '',
                price: '',
                soldFrom: '',
                condition: 'new',
                images: []
            })
        }
        //eslint-disable-next-line
    }, [pid]);

    const onChange = (e) => {
        setFurniture({ ...furniture, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (title === '' || description === '' || price === '' || soldFrom === '' || condition === '')
            return;
        if (pid)  //edit case
            editFurniture(pid, furniture);
        else
            addFurniture(furniture); //here user._id is not required
        setFurniture({
            title: '',
            description: '',
            price: '',
            soldFrom: '',
            condition: 'new',
            images: []
        })
    }

    useEffect(() => {
        if (furnitureMessage === 'Ad for furniture listed successfully!' ||
            furnitureMessage === 'Ad for furniture updated successfully!') {
            setAlert('success', furnitureMessage);
            clearFurnitureMessage();
        }
        //eslint-disable-next-line
    }, [furnitureMessage])

    const myRef = useRef(null);

    const fileSelectedEvent = (e) => {
        if (e.target.files.length > 3) {
            // console.log('No more than 3 files allowed');
            myRef.current.disabled = true;
            setAlert('warning', 'You cannot upload more than 3 images');
            return;
        }
        myRef.current.disabled = false;
        setFurniture({
            ...furniture,
            images: e.target.files
        })
    }


    const { title, description, price, soldFrom, condition } = furniture;
    return (
        <section>
            <div className="container-fluid" style={{ paddingTop: '19vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6 border p-4 mb-2 pb-2">
                        <div className="d-flex">
                            <i className="fas fa-couch fa-5x d-block"></i>
                            <div className="ml-5">
                                <h1 className="font-weight-bold">Post Ad</h1>
                                <p className="text-secondary mt-1">Selected Category: <span className="font-weight-bold">Furniture</span></p>
                            </div>
                        </div>
                        <hr />
                        <Alert />
                        <form onSubmit={onSubmit}>
                            <div className="mb-3 field-required">
                                <label>Ad Title</label>
                                <input type="text" name="title" className="form-control" value={title} onChange={onChange}
                                    required></input>
                            </div>
                            <div className="mb-4 field-required">
                                <label>Ad Description</label>
                                <textarea name="description" className="form-control" value={description} onChange={onChange}></textarea>
                            </div>

                            <div className="mb-3 field-required">
                                <label>Price</label>
                                <input type="number" name="price" className="form-control" min="1" value={price} onChange={onChange} required></input>
                            </div>
                            <div className="mb-4 field-required">
                                <label>Sold From</label>
                                <input type="text" name="soldFrom" className="form-control" value={soldFrom} onChange={onChange} required></input>
                            </div>
                            <div className="mb-4 field-required">
                                <label>Condition</label>
                                <select name="condition" className="form-control" value={condition} onChange={onChange} required>
                                    <option value="new">New</option>
                                    <option value="old">Old</option>
                                </select>
                            </div>
                            {pid ? null :
                                <div className="form-group">
                                    <label htmlFor="file">Select Image(s)</label>
                                    <input type="file" name="images" className="form-control-file" id="file" onChange={fileSelectedEvent}
                                        accept="image/*" multiple required />
                                </div>
                            }
                            <div className="text-center">
                                <button ref={myRef} type="submit" className="btn btn-info btn-lg my-3">{pid ? "Edit " : "Post "}Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddFurniture;