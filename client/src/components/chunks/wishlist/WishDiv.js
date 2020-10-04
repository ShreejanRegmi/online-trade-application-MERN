import React from 'react'
import cardImage from '../../../images/card-image.jpg';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const WishDiv = ({ id, title, price, soldFrom, datePosted, cat, deleteWish, images }) => {
    const trashIconStyle = { position: 'absolute', top: '1%', right: '2%', cursor: 'pointer' };
    const cardStyle = { position: 'relative', maxWidth: '18rem', cursor: 'initial' };
    return (
        <div className="col-xs-10 col-sm-6 col-lg-4 my-3 text-center">
            <div className="card product-card mx-auto" style={cardStyle}>
                <img src={"http://localhost:3000/images/"+images[0]} alt="" className="card-img-top" style={{ width: '50%', margin: 'auto' }} />
                <div className="card-body p-1 pt-2">
                    <hr />
                    <h5 className="card-title font-weight-normal">{title}</h5>
                    <span className="font-weight-bold text-secondary" style={trashIconStyle} onClick={() => { deleteWish(id) }}><i className="p-2 far fa-trash-alt text-danger wishlist-trash-icon"></i></span>
                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. {new Intl.NumberFormat().format(price)}</h5>
                    <Link className="mt-2 btn btn-info" to={`/product/${id}?c=${cat}`}>View Page</Link>
                </div>
                <div className="card-footer text-muted card-footer-address mt-3">
                    <div className="d-flex justify-content-between">
                        <span>{soldFrom}</span>
                        <span>{dateFormat(datePosted, "mmm-d")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishDiv;