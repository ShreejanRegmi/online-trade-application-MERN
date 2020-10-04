import React from 'react'
import { Link } from 'react-router-dom';
const NavbarSellDropdown = ({ categories, icon, collapseNavbar }) => {
    const sellLinks = {         //the key value must be same as the category name in database
        Furnitures: 'furniture',
        Vehicles: 'vehicle',
        'Mobile Phones': 'mobile',
        'Clothings': 'clothing',
        'Computers & Laptops': 'computer',
        'Other Electronics': 'otherElectronics'
    }
    return (
        <div className="dropdown-menu dropdown-menu-right">
            {categories.map(category => (
                // <Link to={"/addProduct/"+category._id} className="dropdown-item py-2">
                <Link key={category._id} to={"/addProduct/" + sellLinks[category.name]} className="dropdown-item py-2" onClick={collapseNavbar}>
                    <i className={icon[category.name]}></i>&emsp;{category.name}
                </Link>
            ))}
        </div>
    )
}

export default NavbarSellDropdown;
