import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const CategoryDropdown = ({ categories, icon, collapseNavbar }) => {
    const l = categories.length;
    const links = {
        Furnitures: '/category/items?c=furniture',
        Vehicles: '/category/items?c=vehicle',
        'Mobile Phones': '/category/items?c=mobile',
        'Computers & Laptops': '/category/items?c=computer'
    }

    return (
        <div className="dropdown-menu">
            {categories.slice(0, categories.length - 1).map(category => (
                <Link key={category._id} to={links[category.name]} className="dropdown-item py-3" onClick={collapseNavbar}>
                    <i className={icon[category.name]}></i>&emsp;{category.name}
                </Link>
            ))}
            {l > 1 && <Fragment>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item py-2" to={links[categories[l - 1].name]} onClick={collapseNavbar}><i className={icon[categories[l - 1].name]}></i>&emsp;{categories[l - 1].name}</Link>
            </Fragment>}
        </div>
    )
}

export default CategoryDropdown
