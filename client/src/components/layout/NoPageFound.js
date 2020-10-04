import React, { useEffect, useContext } from 'react'
import image from '../../images/404.png';
import AuthContext from '../../context/auth/authContext';



const NoPageFound = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <section>
            <div className="container">
                <div className="row" style={{ paddingTop: '8rem' }}>
                    <div className="col">
                        <div className="text-center">
                            <img src={image} alt="404" style={{ width: '60%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoPageFound;
