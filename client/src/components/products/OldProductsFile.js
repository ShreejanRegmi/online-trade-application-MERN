import React from 'react'
import cardImage from '../../images/card-image.jpg';
import { Link } from 'react-router-dom';

const Products = (props) => {

    return (
        <div className="row p-4 justify-content-center bg-light">
            <div className="col-10 text-center mb-3">
                <h2 className="font-weight-normal py-2">Home Products</h2>
               
                <div className="row mt-4 justify-content-left">

                    <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2">
                        <Link to='/product' className="product-class-link">
                            <div className="card product-card" style={{ position: 'relative' }}>
                                <img src={cardImage} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto' }} />
                                <div className="card-body pt-2">
                                    <hr />
                                    <h5 className="card-title font-weight-normal">Men's Shampoo</h5>
                                    <span className="badge badge-success p-2" style={{ position: 'absolute', top: '2%', right: '3%' }}>New</span>
                                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. 600</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer text-muted card-footer-address">
                                    <div className="d-flex justify-content-between">
                                        <span>Kritipur, Kathmandu</span>
                                        <span>27-Aug</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    
                    <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2">
                        <Link to='/product' className="product-class-link">
                            <div className="card product-card" style={{ position: 'relative' }}>
                                <img src={cardImage} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto' }} />
                                <div className="card-body pt-2">
                                    <hr />
                                    <h5 className="card-title font-weight-normal">Men's Shampoo</h5>
                                    <span className="badge badge-success p-2" style={{ position: 'absolute', top: '2%', right: '3%' }}>New</span>
                                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. 600</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer text-muted card-footer-address">
                                    <div className="d-flex justify-content-between">
                                        <span>Kritipur, Kathmandu</span>
                                        <span>27-Aug</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2">
                        <Link to='/product' className="product-class-link">
                            <div className="card product-card" style={{ position: 'relative' }}>
                                <img src={cardImage} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto' }} />
                                <div className="card-body pt-2">
                                    <hr />
                                    <h5 className="card-title font-weight-normal">Men's Shampoo</h5>
                                    <span className="badge badge-warning p-2" style={{ position: 'absolute', top: '2%', right: '3%' }}>Used</span>
                                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. 600</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer text-muted card-footer-address">
                                    <div className="d-flex justify-content-between">
                                        <span>Kritipur, Kathmandu</span>
                                        <span>27-Aug</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2">
                        <Link to='/product' className="product-class-link">
                            <div className="card product-card" style={{ position: 'relative' }}>
                                <img src={cardImage} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto' }} />
                                <div className="card-body pt-2">
                                    <hr />
                                    <h5 className="card-title font-weight-normal">Men's Shampoo</h5>
                                    <span className="badge badge-success p-2" style={{ position: 'absolute', top: '2%', right: '3%' }}>New</span>
                                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. 600</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer text-muted card-footer-address">
                                    <div className="d-flex justify-content-between">
                                        <span>Kritipur, Kathmandu</span>
                                        <span>27-Aug</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-xl-3 my-2">
                        <Link to='/product' className="product-class-link">
                            <div className="card product-card" style={{ position: 'relative' }}>
                                <img src={cardImage} alt="" className="card-img-top" style={{ width: '70%', margin: 'auto' }} />
                                <div className="card-body pt-2">
                                    <hr />
                                    <h5 className="card-title font-weight-normal">Men's Shampoo</h5>
                                    <span className="badge badge-warning p-2" style={{ position: 'absolute', top: '2%', right: '3%' }}>Used</span>
                                    <h5 className="card-subtitle my-2 text-secondary font-weight-bold">Rs. 600</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer text-muted card-footer-address">
                                    <div className="d-flex justify-content-between">
                                        <span>Kritipur, Kathmandu</span>
                                        <span>27-Aug</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <button className="btn btn-md btn-outline-info p-2 mt-4">Load More</button>
            </div>
        </div>
    )
}

export default Products
