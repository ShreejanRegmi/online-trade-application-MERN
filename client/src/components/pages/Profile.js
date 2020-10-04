import React, { useContext, useEffect, useState, Fragment } from 'react'
import avatar from '../../images/user-avatar.png';
import AuthContext from '../../context/auth/authContext';
import capitalize from '../../utils/capitalize';
import ChangePasswordModal from '../chunks/my-profile/ChangePasswordModal';
import $ from 'jquery';
import UserProductsTemplate from '../chunks/user_products_template/UserProductsTemplate';
import EditModal from '../chunks/my-profile/edit-ads/EditModal';
import axios from 'axios';


const Profile = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser, user, setEditTrue, isAdmin } = authContext;

    const [items, setItems] = useState({
        addedFurnitures: [],
        addedVehicles: [],
        addedMobiles: [],
        addedComputers: [],
        itemsLoading: false
    });

    const { addedFurnitures, itemsLoading, addedComputers, addedVehicles, addedMobiles } = items;

    useEffect(() => {
        loadUser();
        return () => {
            $('#change-password-modal').modal('hide');
        }
        // eslint-disable-next-line
    }, []);

    const setItemsLoading = (value = true) => {
        setItems({ ...items, itemsLoading: value });
    }

    const getProfileItems = async () => {
        setItemsLoading();
        try {
            const furnitures = await axios.get('/profileFurnitures');
            const mobiles = await axios.get('/profileMobiles');
            const vehicles = await axios.get('/profileVehicles');
            const computers = await axios.get('/profileComputers');
            setItems({
                ...items,
                addedFurnitures: furnitures.data,
                addedMobiles: mobiles.data,
                addedVehicles: vehicles.data,
                addedComputers: computers.data,
                itemsLoading: false
            })
        } catch (error) {
            setItemsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getProfileItems();
        //eslint-disable-next-line
    }, []);

    //function to remove the deleted ad from profile page
    const removeDeletedAd = (id, type) => {
        if (type === 'furniture')
            setItems({ ...items, addedFurnitures: addedFurnitures.filter(p => p._id !== id) });
        if (type === 'mobile')
            setItems({ ...items, addedMobiles: addedMobiles.filter(p => p._id !== id) });
        if (type === 'vehicle')
            setItems({ ...items, addedVehicles: addedVehicles.filter(p => p._id !== id) });
        if (type === 'computer')
            setItems({ ...items, addedComputers: addedComputers.filter(p => p._id !== id) });
    }

    if (!user)
        return null;

    const { firstname, lastname, email, description, facebook, instagram, phone } = user;

    const avatarStyle = {
        maxWidth: '175px',
        borderRadius: '50%'
    }

    const setEdit = () => {
        setEditTrue();
        props.history.push('/editProfile');
    }

    return (
        <section>
            <ChangePasswordModal />
            <EditModal items={items} removeDeletedAd={removeDeletedAd} />
            <div className="container-fluid" style={{ paddingTop: '96px' }}>
                <div className="row pt-5 pb-3 justify-content-center text-center">
                    <div className="col">
                        <div className="row">
                            <div className="col-xs-10 col-md-4">
                                <div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={avatar} alt="" style={avatarStyle} />
                                        </div>
                                        <div className="mt-3">
                                            <h3>{capitalize(firstname)} {capitalize(lastname)}</h3>
                                            <p className="text-muted mt-3">{description}</p>
                                        </div>
                                        {/* follow part */}
                                        <div className="card py-2">
                                            <div className="card-title lead font-weight-normal">Your Information:</div>
                                            <div className="card-body p-1">
                                                {facebook && <a href={"https://www.facebook.com/" + facebook} target="_blank" rel="noopener noreferrer" className="badge p-2 text-white" style={{ backgroundColor: '#3b5998' }}><i className="fab fa-facebook-f"></i> Facebook</a>}
                                                &emsp;
                                                {instagram && <a href={"https://www.instagram.com/" + instagram} target="_blank" rel="noopener noreferrer" className="badge p-2 text-white" style={{ backgroundColor: '#517fa4' }}><i className="fab fa-instagram"></i> Instagram</a>}
                                                <div className="mt-2">
                                                    <i className="fas fa-phone-alt text-secondary"></i> <span className="text-secondary">+977-{phone}</span>
                                                </div>
                                                <div className="mt-1">
                                                    <i className="fas fa-envelope text-secondary"></i> <span className="text-secondary">{email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* profile controls part- should only be shown on own profile */}
                                        {/* <ProfileControls /> */}

                                        <div className="list-group mt-4 font-weight-normal" style={{ width: '90%', margin: 'auto' }}>
                                            <li className="list-group-item list-group-item-action cursor-pointer" onClick={setEdit}>
                                                <i className="fas fa-user-edit"></i> Edit Profile
                                            </li>
                                            {!isAdmin &&
                                                <button data-toggle="modal" data-target="#change-password-modal" className="btn list-group-item list-group-item-action cursor-pointer" style={{ boxShadow: 'none' }}>
                                                    <i className="fas fa-key"></i> Change Password
                                                </button>}

                                            {
                                                (!itemsLoading && !isAdmin) &&
                                                <button data-toggle="modal" data-target="#edit-products-modal" className="btn list-group-item list-group-item-action cursor-pointer" style={{ boxShadow: 'none' }}>
                                                    <i className="fas fa-edit"></i> Edit Posted Ads
                                                </button>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-10 col-md-8 mt-5 pt-2">
                                {!isAdmin &&
                                    <Fragment>
                                        <h4 className="text-left">Published Ads</h4>
                                        <UserProductsTemplate
                                            addedFurnitures={addedFurnitures}
                                            addedVehicles={addedVehicles}
                                            addedComputers={addedComputers}
                                            addedMobiles={addedMobiles}
                                            itemsLoading={itemsLoading}
                                        />
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;
