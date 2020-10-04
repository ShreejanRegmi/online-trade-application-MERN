import React, { Fragment } from 'react'

const ProductDetail = ({ type, product }) => {

    switch (type) {
        case "furniture":
            return (
                <Fragment></Fragment>
            )
        case "computer":
        case "mobile":
            return (
                <Fragment>
                    <h3>Details</h3>
                    <div className="row">
                        <div className="col-xs-10 col-lg-6">
                            <div className="row">
                                <div className="col-6 text-secondary font-weight-bold">Brand:</div>
                                <div className="col-6 ">{product.brand}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '70%', margin: 'auto' }} className="mt-4">
                        <hr />
                    </div>
                </Fragment>
            )
        case "vehicle":
            return (
                <Fragment>
                    <h3>Details</h3>
                    <div className="row my-3">
                        <div className="col-xs-10 col-lg-6">
                            <div className="row">
                                <div className="col-6 text-secondary font-weight-bold">Distance Travelled:</div>
                                <div className="col-6 ">{product.kmDriven}</div>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-6">
                            <div className="row">
                                <div className="col-6 text-secondary font-weight-bold">Manufactured Year:</div>
                                <div className="col-6">{product.mfgdYear}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-10 col-lg-6">
                            <div className="row">
                                <div className="col-6 text-secondary font-weight-bold">Brand:</div>
                                <div className="col-6 ">{product.brand}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '70%', margin: 'auto' }} className="mt-4">
                        <hr />
                    </div>
                </Fragment>
            )
        default:
            return (<div> </div>);
    }
}

export default ProductDetail;