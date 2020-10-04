import React, { Fragment, useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import avatar from '../../images/user-avatar.png';
import AuthContext from '../../context/auth/authContext';
import capitalize from '../../utils/capitalize';
import CategoryContext from '../../context/category/categoryContext';
import CategoryDropdown from '../chunks/navbar/CategoryDropdown';
import NavbarSellDropdown from '../chunks/navbar/NavbarSellDropdown';

//imports of products 
import FurnitureContext from '../../context/furniture/furnitureContext'; //furnitureContext
import VehicleContext from '../../context/vehicle/vehicleContext'; //vehicleContext
import MobileContext from '../../context/mobile/mobileContext'; //mobileContext
import ComputerContext from '../../context/computer/computerContext'; //computerContext

import WishlistContext from '../../context/wishlist/wishlistContext';
import $ from 'jquery';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const categoryContext = useContext(CategoryContext);

    const furnitureContext = useContext(FurnitureContext);
    const { getAllFurnitures } = furnitureContext;

    const vehicleContext = useContext(VehicleContext);
    const { getAllVehicles } = vehicleContext;

    const mobileContext = useContext(MobileContext);
    const { getAllMobiles } = mobileContext;

    const computerContext = useContext(ComputerContext);
    const { getAllComputers } = computerContext;

    const wishlistContext = useContext(WishlistContext);
    const { clearWishes } = wishlistContext;

    const { getAllCategories, categories } = categoryContext;
    //eslint-disable-next-line
    const { isAuthenticated, user, logout, isAdmin } = authContext;

    useEffect(() => {
        getAllCategories();
        getAllFurnitures();
        getAllVehicles();
        getAllComputers();
        getAllMobiles();
        //eslint-disable-next-line
    }, []);

    const collapseNavbar = () => {
        $('.collapse').collapse('hide');
    }

    const logoutFn = () => {
        logout();
        clearWishes();
        collapseNavbar();
    }

    const icon = {
        Furnitures: 'fas fa-couch',
        Vehicles: 'fas fa-car',
        'Mobile Phones': 'fas fa-mobile',
        'Computers & Laptops': 'fas fa-laptop',
    }


    const LogoutButton = (
        <li className="nav-item px-2 align-self-md-center">
            <button className="nav-link text-uppercase font-weight-bold text-light btn btn-danger d-inline-block" onClick={logoutFn} >Logout</button> {/*originally color-logo class was used*/}
        </li>
    )

    const UserProfileDropdown = (
        <li className="nav-item dropdown pr-2">
            <a className="nav-link dropdown-toggle font-weight-bold text-light" href="#a" data-toggle="dropdown">
                <img src={avatar} style={{ maxWidth: '50px', borderRadius: '50%' }} alt="" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                <Link to="/profile" className="dropdown-item my-1" href="#a" onClick={collapseNavbar}><i className="fas fa-user"></i>&nbsp;&nbsp;&nbsp;{user && capitalize(user.firstname)}</Link>
                {!isAdmin ? <Link className="dropdown-item my-1" to="/wishlist" onClick={collapseNavbar}><i className="fas fa-heart"></i>&nbsp;&nbsp;&nbsp;Wishlist</Link> : null}
            </div>
        </li>
    )

    //eslint-disable-next-line
    const adminLinks = (
        <Fragment>
            {LogoutButton}
            {UserProfileDropdown}
        </Fragment>
    );

    const userLinks = (
        <Fragment>
            {LogoutButton}
            <li className="nav-item px-2 align-self-md-center my-2">
                <Link className="btn color-logo text-white font-weight-bold text-uppercase" to="/chat" onClick={collapseNavbar}> 
                    <i className="fas fa-comments"></i> Chat
                </Link>
            </li>
            <li className="nav-item px-2 align-self-md-center">
                <div className="dropdown">
                    <button className="nav-link text-uppercase font-weight-bold text-light btn color-logo d-inline-block dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-wallet"></i> Sell
                    </button>
                    <NavbarSellDropdown categories={categories} icon={icon} collapseNavbar={collapseNavbar}/>
                </div>
            </li>
            {UserProfileDropdown}
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item px-2 align-self-md-center">
                <NavLink exact className="nav-link text-uppercase font-weight-bold text-light btn color-logo d-inline-block" to="/login" activeClassName="current" onClick={collapseNavbar}>{/*<i className="fas fa-sign-in-alt"></i>*/}Login</NavLink>
            </li>
            <li className="nav-item px-2 pr-3 align-self-md-center">
                <NavLink exact className="nav-link text-uppercase font-weight-bold text-light" to="/register" activeClassName="current" onClick={collapseNavbar}>Register</NavLink>
            </li>
        </Fragment>
    );



    return (
        <nav className="navbar navbar-light fixed-top bg-dark navbar-expand-md">
            <Link to={isAdmin ? "/admin/home" : "/"} className="navbar-brand" onClick={collapseNavbar}>
                <img src={logo} alt="" style={{ width: '190px' }} />
            </Link>
            <button type="button" className="navbar-toggler bg-light" data-toggle="collapse" data-target="#nav"><span
                className="navbar-toggler-icon"></span></button>

            <div className="collapse navbar-collapse justify-content-between" id="nav">
                <ul className="navbar-nav">
                    <li className="nav-item px-3">
                        <NavLink exact className="nav-link text-uppercase font-weight-bold text-light" activeClassName="current" onClick={collapseNavbar} to={isAdmin ? "/admin/home" : "/"}>Home</NavLink>
                    </li>
                    {!isAdmin ?
                        <Fragment>
                            <li className="nav-item dropdown px-3">
                                <a className="nav-link dropdown-toggle text-uppercase font-weight-bold text-light" href="#a"
                                    data-toggle="dropdown">Categories</a>
                                <CategoryDropdown categories={categories} icon={icon} collapseNavbar={collapseNavbar}/>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink exact className="nav-link text-uppercase font-weight-bold text-light" to="/about" onClick={collapseNavbar} activeClassName="current" >About</NavLink>
                            </li>
                        </Fragment>
                        : null
                    }

                </ul>
                <ul className="navbar-nav">
                    {/* search button */}
                    {
                        !isAdmin ?
                            <div className="d-flex align-items-center mr-2">
                                <button className="btn" data-toggle="modal" data-target="#searchModal"><i className="fas fa-search text-light fa-2x"></i></button>
                            </div>
                            :
                            null
                    }

                    {/* if not logged in show these below */}

                    {/* {isAuthenticated ? userLinks : guestLinks} */}

                    {!isAuthenticated ? guestLinks : (
                        !isAdmin ? userLinks : adminLinks
                    )}



                </ul>
            </div>
        </nav>
    )
}

export default Navbar
