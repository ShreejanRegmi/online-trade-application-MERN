import React, { useEffect, useContext, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext';
import WishlistContext from '../../context/wishlist/wishlistContext';
import WishDiv from '../chunks/wishlist/WishDiv';
import Spinner from '../layout/Spinner';
import ConfirmationModal from '../layout/ConfirmationModal';

const Wishlist = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    const wishlistContext = useContext(WishlistContext);
    const { loadWishes, addedWishes, wishesLoading, deleteOneWish, deleteAllWishes } = wishlistContext;


    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isAuthenticated)
            loadWishes();
        //eslint-disable-next-line
    }, [isAuthenticated]);

    const deleteWish = (prodId) => {
        deleteOneWish(prodId);
    }

    const removeAllWishes = () => {
        deleteAllWishes();
    }

    if (wishesLoading) return (
        <Fragment>
            <section>
                <div className="container-fluid" style={{ paddingTop: '96px' }}>
                    <div className="row pt-5">
                        <div className="col">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );

    return (
        <section>
            <ConfirmationModal functiontoexecute={removeAllWishes} />
            <div className="container" style={{ paddingTop: '125px' }}>
                <div className="row pt-4">
                    <div className="col">
                        <div className="d-flex">
                            <i className="far fa-heart fa-7x logo-color-front"></i>
                            <div className="pl-5">
                                <h1 className="display-4">Wishlist</h1>
                                <p className="text-secondary mt-1 font-weight-light">Keep the items, that matter to you the most, in check.</p>
                            </div>
                        </div>
                        {/* <button className="btn btn-md btn-danger" data-toggle="modal" data-target="#confirmation-modal">Open Confirm Modal</button> */}
                        <hr />
                        <div className="d-flex justify-content-between">
                            {/* <button className="btn btn-md btn-danger" onClick={removeAllWishes}>Remove All</button> */}
                            {addedWishes.length > 0 ? <button className="btn btn-md btn-danger" data-toggle="modal" data-target="#confirmation-modal">Remove All</button> : <span></span>}
                            <span className="text-monospace text-secondary align-self-center">Items: <span className="font-weight-bold text-dark">{addedWishes.length}</span></span>
                        </div>
                    </div>
                </div>
                <div className="row pt-4 justify-content-lg-left">
                    {addedWishes.length === 0 ? <div style={{fontSize: '2rem'}} className="text-center w-100 text-muted lead">Wishlist is empty</div> : null}
                    {addedWishes.length > 0 && addedWishes.map(w => w.productAdded).map(p =>
                        <WishDiv key={p._id} id={p._id} title={p.title} price={p.price} soldFrom={p.soldFrom} datePosted={p.datePosted}
                            cat={p.type} deleteWish={deleteWish} images={p.images}/>
                    )}
                    {/* {addedWishes.length > 0 && addedWishes.map( w =>
                        <WishDiv key={w._id} wid={w._id} pid={w.productAdded._id} title={w.productAdded.title} price={w.productAdded.price} soldFrom={w.productAdded.soldFrom} datePosted={w.productAdded.datePosted}
                        cat={w.productAdded.type} />
                    )} */}
                </div>
            </div>
        </section>
    )
}

export default Wishlist
