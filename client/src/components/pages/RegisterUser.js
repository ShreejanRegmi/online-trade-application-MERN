import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const RegisterUser = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    //eslint-disable-next-line
    const { register, error, clearErrors, isAuthenticated, loadUser, setEditTrue, isEdit, setEditFalse, user, editUser, isAdmin } = authContext;

    useEffect(() => {
        if (localStorage.token)
            loadUser();
        if (props.location.pathname === '/editProfile')
            setEditTrue();
        if (isAuthenticated && !isEdit) {
            props.history.push('/'); //code to redirect to root page
        }
        return () => {
            setEditFalse();
        }
        //eslint-disable-next-line
    }, [props.history, isAuthenticated, props.location.pathname]);

    useEffect(() => {
        if (error === 'User already registered' || error === 'Email already taken by another user') {
            setAlert('danger', error);
            clearErrors();
        }
        if (error === 'User edited successfully!') {
            setAlert('success', error);
            clearErrors();
            setTimeout(() => {
                if (isAdmin)
                    props.history.push('/admin/home');
                else
                    props.history.push('/');
            }, 3000)
        }
        //eslint-disable-next-line
    }, [error]);

    const [formUser, setFormUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        password: '',
        password2: '',
        gender: 'male',
        facebook: '',
        instagram: '',
        phone: '',
        description: ''
    })

    useEffect(() => {
        if (user && isEdit) {
            let copyUser = JSON.parse(JSON.stringify(user));
            delete copyUser._id;
            delete copyUser.tokens;
            delete copyUser.__v;
            setFormUser({ ...formUser, ...copyUser });
        }
        else {
            setFormUser({
                firstname: '',
                lastname: '',
                email: '',
                address: '',
                password: '',
                password2: '',
                gender: 'male',
                facebook: '',
                instagram: '',
                phone: '',
                description: ''
            });
        }
        //eslint-disable-next-line
    }, [isEdit, user]);


    const { firstname, lastname, email, address, password, password2, gender, facebook, instagram, phone, description } = formUser;

    const onChange = e => {
        setFormUser({ ...formUser, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (firstname === '' || lastname === '' || email === '' || address === '' || gender === '' || phone === '')
            return;
        if (!isEdit) {
            if (password === '' || password2 === '')
                return;
            if (password !== password2) {
                console.log('passwords dont match');
                setAlert('danger', 'Confirmation password does not match');
                return;
            }
            register({ firstname, lastname, email, address, password, gender, facebook, instagram, phone, description });
        } else if (isEdit) {
            editUser({ firstname, lastname, email, address, gender, phone, facebook, instagram, description });
        }
    }

    return (
        <section className="bg-light">
            <div className="container" style={{ paddingTop: '19vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <Alert />
                        <h2 className="font-weight-normal mb-4">{isAuthenticated ? "Edit" : "Register"} User</h2>
                        <form action="" onSubmit={onSubmit} >
                            <div className="row">
                                <div className="col-md-6 mb-3 field-required">
                                    <label>Firstname</label>
                                    <input type="text" name="firstname" className="form-control" value={firstname} onChange={onChange}
                                        required></input>
                                </div>
                                <div className="col-md-6 mb-3 field-required">
                                    <label>Lastname</label>
                                    <input type="text" name="lastname" className="form-control" value={lastname} onChange={onChange}
                                        required></input>
                                </div>
                            </div>
                            <div className="mb-3 field-required">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={email} onChange={onChange} required></input>
                            </div>
                            <div className="mb-3 field-required">
                                <label>Address</label>
                                <input type="text" name="address" className="form-control" value={address} onChange={onChange} required></input>
                            </div>
                            {!isEdit && <div className="mb-3 field-required">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" minLength="6" value={password} onChange={onChange} required></input>
                            </div>}
                            {!isEdit && <div className="mb-3 field-required">
                                <label>Confirm Password</label>
                                <input type="password" name="password2" className="form-control" minLength="6" value={password2} onChange={onChange} required></input>
                            </div>}
                            <div className="mb-3">
                                <label>Gender</label><br />
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="gender" className="custom-control-input" id="male" checked={gender === 'male'} onChange={onChange} value="male" />
                                    <label className="custom-control-label" htmlFor="male">Male</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="gender" className="custom-control-input" id="female" checked={gender === 'female'} onChange={onChange} value="female" />
                                    <label className="custom-control-label" htmlFor="female">Female</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="gender" className="custom-control-input" id="others" checked={gender === 'others'} onChange={onChange} value="others" />
                                    <label className="custom-control-label" htmlFor="others">Others</label>
                                </div>
                            </div>
                            <div className="mb-3 field-required">
                                <label>Phone</label>
                                <input type="text" name="phone" pattern="\d*" className="form-control" minLength="10" maxLength="10" value={phone} onChange={onChange} required></input>
                            </div>
                            <div className="mb-4">
                                <label>Area of Sales</label>
                                <textarea name="description" className="form-control" value={description} onChange={onChange} placeholder="Describe your area of sales briefly..."></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label><i className="fab fa-facebook-f"></i>&nbsp;Facebook Username</label>
                                    <input type="text" name="facebook" className="form-control" value={facebook} onChange={onChange} ></input>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label><i className="fab fa-instagram"></i>&nbsp;Instagram Username</label>
                                    <input type="text" name="instagram" className="form-control" value={instagram} onChange={onChange} ></input>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-info btn-lg btn-block my-3">{isAuthenticated ? "Edit" : "Create"} Account</button>
                            {!isAuthenticated && <p className="mt-3 text-center">Already a user? <span className="text-primary"><Link to="/login">Login</Link></span></p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterUser
