import React, { Fragment } from 'react'
// import cardImage from '../../images/card-image.jpg';
import { Link } from 'react-router-dom';
import capitalize from '../../utils/capitalize';
import dateFormat from 'dateformat';
import ellipsize from 'ellipsize';

const ProductDivTemplate = ({ id, datePosted, title, description, price, soldFrom, condition, c: cat, archived, userArchived, images}) => {
    return (
        <Fragment>
            {(!archived && !userArchived) ?
                <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2" >
                    <Link to={'/product/' + id + '?c=' + cat} className="product-class-link">
                        <div className="card product-card" style={{ position: 'relative' }}>
                            <img src={"http://localhost:3000/images/"+images[0]} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto', paddingTop: '10px' }} />
                            <div className="card-body pt-2">
                                <hr className="mt-0"/>
                                <h5 className="card-title font-weight-normal">{title}</h5>
                                <span className={"badge " + (condition && condition === "old" ? "badge-warning" : "badge-success") + " p-2"} style={{ position: 'absolute', top: '2%', right: '3%' }}>{condition && capitalize(condition)}</span>
                                <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. {new Intl.NumberFormat().format(price)}</h5>
                                <p className="card-text">{ellipsize(description, 50)}</p>
                            </div>
                            <div className="card-footer text-muted card-footer-address">
                                <div className="d-flex justify-content-between">
                                    <span>{soldFrom}</span>
                                    <span>{dateFormat(datePosted, "mmm-d")}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div> : null
            }
        </Fragment>
    )
}

export default ProductDivTemplate;
