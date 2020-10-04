import React, { useEffect, useContext, useState } from 'react'
// import JustProduct from '../products/JustProduct';
import queryString from 'query-string';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import ProductDivTemplate from '../products/ProductDivTemplate';

const SearchPage = (props) => {
    const parsed = queryString.parse(props.location.search);
    let { type, text, cat, condition, priceMin, priceMax } = parsed;

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token)
            authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    const [result, setResult] = useState(null);
    const [priceValue, setPriceValue] = useState({
        minPrice: '',
        maxPrice: ''
    })

    const {minPrice, maxPrice} = priceValue;

    useEffect(() => {
        (async function () {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('/search', { type, text, cat, condition, priceMin, priceMax }, config);
            setResult(res.data);
        })();
        //eslint-disable-next-line
    }, [type, text, cat, condition, priceMin, priceMax]);

    const catClick = (e) => {
        var mySubString = props.location.search.substring(
            props.location.search.lastIndexOf("&cat=") + 1,
            props.location.search.lastIndexOf("&condition")
        );
        let string = props.location.search.replace(mySubString, "cat=" + e.target.id);
        props.history.push({
            pathname: '/search',
            search: string,
        });
        // let string = props.location.search.replace(/&cat= &/, "vehicles");
    }

    const condClick = (e) => {
        const urlParams = new URLSearchParams(props.location.search);
        const entries = urlParams.entries();

        const obj = paramsToObject(entries);
        console.log(obj);

        let condValue = e.target.value;

        let string = `?type=${obj.type}&text=${obj.text}&cat=${obj.cat}&condition=${condValue}`;
        if (obj.priceMin)
            string = string + `&priceMin=${obj.priceMin}`
        if (obj.priceMax)
            string = string + `&priceMax=${obj.priceMax}`

        props.history.push({
            pathname: '/search',
            search: string,
        });
    }

    function paramsToObject(entries) {
        let result = {}
        //eslint-disable-next-line
        for (let entry of entries) {
            const [key, value] = entry;
            result[key] = value;
        }
        return result;
    }

    const onChange = (e) => {
        setPriceValue({ ...priceValue, [e.target.name]: e.target.value });
    }

    const priceClick = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(props.location.search);
        const entries = urlParams.entries();

        const obj = paramsToObject(entries);

        let string = `?type=${obj.type}&text=${obj.text}&cat=${obj.cat}&condition=${obj.condition}`;
        if(minPrice){
            string = string + `&priceMin=${minPrice}`
        }
        if (maxPrice)
            string = string + `&priceMax=${maxPrice}`

        props.history.push({
            pathname: '/search',
            search: string,
        });
    }

    const clearPrice = () => {
        const urlParams = new URLSearchParams(props.location.search);
        const entries = urlParams.entries();

        const obj = paramsToObject(entries);
        let string = `?type=${obj.type}&text=${obj.text}&cat=${obj.cat}&condition=${obj.condition}`;
        setPriceValue({
            minPrice: '',
            maxPrice: ''
        })
        props.history.push({
            pathname: '/search',
            search: string,
        });
    }

    if (!result) return (
        <>
            <section>
                <div className="container-fluid" style={{ paddingTop: '96px' }}>
                    <div className="row pt-5">
                        <div className="col">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    return (
        <section style={{ paddingTop: '105px' }}>
            <div className="container-fluid">
                <div className="row pt-4">
                    <div className="col">
                        <h3 className="display-4" style={{ fontSize: '2.7rem' }}>Search Results for: <b>{text}</b></h3>

                        <div className="row pt-5">
                            <div className="col-xs-10 col-lg-3">
                                <div className="sidebar">
                                    <h5 className="mb-2">Categories</h5>
                                    <ul className="list-group text-secondary font-weight-normal mb-2" style={{ maxWidth: '18rem' }}>
                                        <li className="list-group-item no-border cursor-pointer link-hover-darken" id="all" onClick={catClick}>All</li>
                                        <li className="list-group-item no-border cursor-pointer link-hover-darken" id="furnitures" onClick={catClick}>Furnitures</li>
                                        <li className="list-group-item no-border cursor-pointer link-hover-darken" id="mobiles" onClick={catClick}>Mobiles</li>
                                        <li className="list-group-item no-border cursor-pointer link-hover-darken" id="computers" onClick={catClick}>Computers</li>
                                        <li className="list-group-item no-border cursor-pointer link-hover-darken" id="vehicles" onClick={catClick}>Vehicles</li>
                                    </ul>
                                    <div className="mb-4">
                                        <h5 className="mb-3">Condition</h5>
                                        <div className="d-flex">
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="new2" name="condition2" value="new" className="custom-control-input" onClick={condClick}
                                                />
                                                <label className="custom-control-label" htmlFor="new2">New</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="old2" name="condition2" value="old" className="custom-control-input" onClick={condClick}
                                                />
                                                <label className="custom-control-label" htmlFor="old2">Used</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="both2" name="condition2" value="both" className="custom-control-input" defaultChecked
                                                    onClick={condClick} />
                                                <label className="custom-control-label" htmlFor="both2">Both</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="mb-3">Price Range</h5>
                                        <form onSubmit={priceClick}>
                                        <div className="form-row w-75 mb-1">
                                            <div className="col">
                                                <input type="number" name="minPrice" min="1" className="form-control" placeholder="Min" value={minPrice} onChange={onChange} />
                                            </div>
                                            <span>-</span>
                                            <div className="col">
                                                <input type="number" name="maxPrice" min={minPrice === '' ? "1" : parseInt(minPrice) + 1} className="form-control" placeholder="Max" value={maxPrice} onChange={onChange} />
                                            </div>
                                            <div className="col">
                                                <button type="submit" className="btn btn-outline-info">Filter</button>
                                            </div>
                                        </div>
                                        </form>
                                        <span className="text-secondary cursor-pointer link-hover-darken" onClick={clearPrice}><i>Clear Price Filter</i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-10 col-lg-9">
                                <div className="d-flex justify-content-between">
                                    <span className="badge badge-success p-2 align-self-center" style={{ fontSize: 'inherit', fontWeight: 'initial' }}>{result.length} Results</span>
                                    {/* <div className="form-inline">
                                        <span className="text-monospace pr-3">Sort by:</span>
                                        <select className="custom-select custom-select-sm">
                                            <option defaultValue>Newest</option>
                                            <option value="1">Oldest</option>
                                        </select>
                                    </div> */}
                                </div>
                                <hr />
                                <div className="row p-4 justify-content-center">
                                    <div className="col-10 text-center">
                                        <div className={result.length > 0 ? "row justify-content-left" : "row justify-content-center"}>
                                            {
                                                result.length > 0 ? result.map(p =>
                                                    <ProductDivTemplate key={p._id} id={p._id} title={p.title} description={p.description}
                                                        datePosted={p.datePosted} price={p.price} soldFrom={p.soldFrom} condition={p.condition} c={p.type}
                                                        archived={p.archived} userArchived={p.userArchived} images={p.images} />
                                                ) : <h2 className="lead text-secondary">No matching ads found</h2>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default SearchPage
