import React, { useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import FurnitureContext from '../../context/furniture/furnitureContext';
import MobileContext from '../../context/mobile/mobileContext';
import VehicleContext from '../../context/vehicle/vehicleContext';
import ComputerContext from '../../context/computer/computerContext';
import ProductDivTemplate from '../products/ProductDivTemplate';
import queryString from 'query-string';

const ProductCategory = (props) => {
    const parsed = queryString.parse(props.location.search);
    const cat = parsed.c;
    const authContext = useContext(AuthContext);
    const furnitureContext = useContext(FurnitureContext);
    const { furnitures } = furnitureContext;
    const mobileContext = useContext(MobileContext);
    const { mobiles } = mobileContext;
    const vehicleContext = useContext(VehicleContext);
    const { vehicles } = vehicleContext;
    const computerContext = useContext(ComputerContext);
    const { computers } = computerContext;

    useEffect(() => {
        if (localStorage.token)
            authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    var items;
    if (cat === "furniture")
        items = furnitures;
    else if (cat === "vehicle")
        items = vehicles;
    else if (cat === "mobile")
        items = mobiles;
    else if (cat === "computer")
        items = computers;

    const icon = {
        furniture: 'couch',
        mobile: 'mobile',
        vehicle: 'car',
        computer: 'laptop'
    }

    return (
        <section>
            <div className="container-fluid" style={{ paddingTop: "13vh" }}>
                <div className="row p-4 bg-light justify-content-center">
                    <div className="col">
                        <div className="d-flex justify-content-center text-center m-auto align-items-center">
                            <i className={`fas fa-${icon[cat]} fa-5x`}></i>
                            <div className="ml-4">
                                <h2 className="font-weight-bold text-capitalize">{cat + 's'}</h2>
                                {/* <p className="text-secondary mt-1">Showing Items: <span className="font-weight-bold">{items.length}</span></p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4 justify-content-center">
                    <div className="col-10 text-center">
                        <div className="row justify-content-left">
                            {
                                items.length > 0 && items.map(p =>
                                    <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                                        datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                                        archived={p.archived} userArchived={p.userArchived} images={p.images} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCategory
