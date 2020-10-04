import React, { Fragment, useEffect, useContext } from "react";
import stockImage from '../../images/about-image.jpg';
import { HashLink } from 'react-router-hash-link';
import $ from "jquery";
import FeedbackForm from '../feedback/FeedbackForm';
import AuthContext from '../../context/auth/authContext';

const About = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token)
            authContext.loadUser();
        //eslint-disable-next-line
    }, [localStorage.token]);

    useEffect(() => {
        $('[data-toggle="popover"]').popover();
        $('.popover-dismiss').popover({
            trigger: 'focus'
        });
        //eslint-disable-next-line
    }, []);

    const imageStyle = {
        backgroundImage: `url(${stockImage})`,
        height: '300px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '20% 80%'
    }

    const colorForIcons = '#34435E'
    return (
        <Fragment>
            <section>
                {/* about part */}
                <div className="container-fluid" style={{ paddingTop: "13vh" }}>
                    <div className="row p-5 justify-content-center bg-light">
                        <div className="col text-center mb-3">
                            <h1 className="font-weight-normal display-4" style={{ color: '#1497D3' }}>About</h1>
                            <p className="lead text-secondary mt-1">What about this site?</p>
                            <p className="text-secondary lead font-weight-normal py-2 mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
                                fugit voluptatum obcaecati placeat soluta fugiat nihil nesciunt?
                                Dignissimos quae at neque labore quos? Facilis dolorem minima
                                doloremque provident corrupti quae sapiente neque dolores fugit
                                quod, odio saepe illum ex. Explicabo quo a quas iste provident
                                repellat maxime sint id ex, velit, obcaecati incidunt deleniti
                                error aliquid? Aliquam, dolores excepturi. Repellat beatae
                                doloribus accusantium enim nulla, odit et reprehenderit accusamus
                                explicabo? Minima, culpa pariatur deserunt error optio architecto
                                tempore voluptas accusantium doloribus cumque facere expedita
                                saepe autem sint eveniet, ut magnam eos impedit quia! Illum
                                deserunt sequi pariatur quam odio cumque.
                         </p>
                            <HashLink smooth className="btn btn-md btn-outline-info p-2 mt-4" to="/about#contact-form">
                                CONTACT US</HashLink>
                        </div>
                    </div>
                    {/* image part */}
                    <div className="row p-5 justify-content-center" style={imageStyle}>

                    </div>
                    {/* merits part */}
                    <div className="row p-5 justify-content-center">
                        <div className="col text-center mb-3">
                            <h1 className="font-weight-normal display-4" style={{ color: '#1497D3' }}>Merits</h1>
                            <p className="lead text-secondary mt-2">Take them for granted</p>
                            <div className="row text-center mt-5">
                                <div className="col-lg-4 col-sm-10 mx-auto mb-5">
                                    <i className="fas fa-users fa-6x mb-3" style={{ color: colorForIcons }}></i>
                                    <h1 className="text-secondary">Community</h1>
                                    <p className="text-muted my-4">N-Trade is driven by a large community of users who are constantly on business. So, there will always be
                                someone who has the exact item that you want.</p>
                                    <button className="btn btn-outline-info" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Contents will be added later">Learn more</button>
                                </div>
                                <div className="col-lg-4 col-sm-10 mx-auto mb-5">
                                    <i className="fas fa-shipping-fast fa-6x mb-3" style={{ color: colorForIcons }}></i>
                                    <h1 className="text-secondary">Speed</h1>
                                    <p className="text-muted my-4">Interactive and user-friendly design Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime nam ullam cupiditate nesciunt nostrum quos amet ipsum consequuntur!.</p>
                                    <button className="btn btn-outline-info" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Contents will be added later">Learn more</button>
                                </div>
                                <div className="col-lg-4 col-sm-10 mx-auto mb-5">
                                    <i className="fas fa-key fa-6x mb-3" style={{ color: colorForIcons }}></i>
                                    <h1 className="text-secondary">Security</h1>
                                    <p className="text-muted my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nobis qui praesentium autem aspernatur repellat vel sapiente commodi!</p>
                                    <button className="btn btn-outline-info" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Contents will be added later">Learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* contact us form */}
                    <FeedbackForm />
                </div>
            </section>
        </Fragment>
    );
};

export default About;
