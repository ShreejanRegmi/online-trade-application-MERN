import React, { useEffect, useContext, Fragment } from 'react'
import queryString from 'query-string';
// import image from '../../images/card-image.jpg';
// import sliderImage from '../../images/slider-image.jpg';
import avatar from '../../images/user-avatar.png';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
import dateFormat from 'dateformat';
import capitalize from '../../utils/capitalize';
import ProductDetail from '../chunks/product_page/ProductDetail';
import WishlistContext from '../../context/wishlist/wishlistContext';
import AlertContext from '../../context/alert/alertContext';
//if screen shatters while sliding of image, change the padding of details box or margin of slider div
//use column name and object['columnname'] to build row


const Product = (props) => {
    const { match } = props;
    const parsed = queryString.parse(props.location.search);

    const authContext = useContext(AuthContext);
    const { loadUser, user, isAuthenticated } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const wishlistContext = useContext(WishlistContext);
    const { loadWishes, productsIds, addWish } = wishlistContext;

    const productContext = useContext(ProductContext);
    const { product, productLoading, getSelectedProduct } = productContext;

    const { title, description, price, soldFrom, condition, type, addedBy: productOwner, datePosted, images } = product;

    useEffect(() => {
        if (localStorage.token)
            loadUser();
        //eslint-disable-next-line
    }, []);


    useEffect(() => {
        getSelectedProduct(match.params.productId, parsed.c);
        if (localStorage.token)
            loadWishes();
        //eslint-disable-next-line
    }, [])

    const avatarStyle = {
        maxWidth: '100px',
        borderRadius: '50%'
    }

    //capitalize(product.type) must be same as item's model name
    const addToWishlist = () => {
        if (!localStorage.token) {
            setAlert('danger', 'You must be logged in to add to wishlist!');
            return props.history.push('/login');
        }
        addWish(match.params.productId, capitalize(product.type));
    }

    if (productLoading || !productOwner) return (
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

    const { _id, firstname, lastname, joinedOn } = productOwner;

    return (
        <section className="pb-4">
            <div className="container-fluid" style={{ paddingTop: '96px' }}>
                <div className="row pt-5 justify-content-center">
                    <div className="col-11">
                        <div className="row text-center">

                            {/* left-sided section (whole) */}
                            <div className="col-xs-10 col-lg-8">
                                {/* carousel */}
                                <div className="productpage-productimage">
                                    <div id="product-slider" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            {
                                                images.map((image, i) =>
                                                    <li key={i} data-target="#product-slider" data-slide-to="0" className={i === 0 ? "active" : ""}></li>
                                                )
                                            }
                                        </ol>
                                        <div className="carousel-inner">
                                            {
                                                images.map((image, i) =>
                                                    <div key={i} className={i === 0 ? "carousel-item active" : "carousel-item"}>
                                                        <img src={"http://localhost:3000/images/" + image} className="d-block w-50 m-auto" alt="..." />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <a className="carousel-control-prev productpage-sliderbutton-prev" href="#product-slider" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>
                                        <a className="carousel-control-next productpage-sliderbutton-next" href="#product-slider" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a>
                                    </div>
                                </div>
                                {/* details box */}
                                {/* To make proper details: show just the uncommon properties. Create one component where you send
                                type of product and the product properties. In that component use if else condition to create div or other components specific to the product */}
                                <div className="p-4 mt-4 bg-light simple-bordered">
                                    <ProductDetail type={type} product={product} />
                                    {/* description part */}
                                    <div className="my-3">
                                        <h4 className="my-3">Description</h4>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-10 col-lg-4">

                                {/* price in a box */}
                                <div className="card p-2 w-100" style={{ position: 'relative' }}>
                                    <div className="card-body">
                                        <h2 className="card-title display-5 font-weight-bold mb-2">{title} </h2>
                                        <span className={"badge " + (condition && condition === "old" ? "badge-warning" : "badge-success") + " p-2"} style={{ position: 'absolute', top: '2%', right: '3%' }}>{condition && capitalize(condition)}</span>
                                        <h4 className="card-subtitle mb-2 text-muted my-2 mb-3">Rs. {new Intl.NumberFormat().format(price)}</h4>
                                        {/* {console.log(match.params.productId)} */}
                                        {productsIds && productsIds.indexOf(match.params.productId) === -1 ? (user && (_id === user._id)) ? null : <button className="btn btn-info card-link" onClick={addToWishlist}><i className="fas fa-plus"></i> Add to Wishlist</button>
                                            : <button className="btn btn-outline-success card-link" disabled><i className="fas fa-check"></i> Added to Wishlist</button>}


                                    </div>
                                    <div className="card-footer text-muted card-footer-address">
                                        <div className="d-flex justify-content-between">
                                            <span>{soldFrom}</span>
                                            <span>{dateFormat(datePosted, "d-mmm-yyyy")}</span>
                                        </div>
                                    </div>
                                </div>
                                {/*Chat div to link chat page*/}
                                {
                                    (isAuthenticated) ?
                                        (
                                            (user && (user._id === _id)) ?
                                                null
                                                : <Link to={"/chat?chatWith=" + _id} className="remove-div-link-style">
                                                    <div className="card w-100 mt-4 hover-effect">
                                                        <div className="card-header">
                                                            <h6 className="lead m-0 p-0">Chat with Seller</h6>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="text-center">
                                                                <h6>{capitalize(firstname)} {capitalize(lastname)}</h6>
                                                            </div>
                                                            <div className="mt-2">
                                                                <button className="btn btn-outline-primary btn-md mt-2"><i class="fas fa-comments"></i> Chat</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>)
                                        : null
                                }

                                {/* user profile who added */}
                                <Link to={(isAuthenticated && user._id == _id) ? "/profile" : "/user/" + _id} className="remove-div-link-style">
                                    <div className="card w-100 mt-4 hover-effect">
                                        <div className="card-header">
                                            <h6 className="lead m-0 p-0">Seller Details</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img src={avatar} alt="" style={avatarStyle} />
                                            </div>
                                            <div className="mt-2">
                                                <h6>{capitalize(firstname)} {capitalize(lastname)}</h6>
                                                <button className="btn btn-outline-primary btn-sm mt-2">View Profile</button>
                                                <p className="text-muted seller-joined mt-3">Joined on: {dateFormat(joinedOn, "mmm-yyyy")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>



                            </div>
                        </div>
                    </div>

                </div>
                {/* other items from that category as a separate row*/}

            </div>
        </section>
    )
}

export default Product


