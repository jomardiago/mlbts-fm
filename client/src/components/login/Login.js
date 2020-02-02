import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../redux/auth/authActions';

const Login = ({ loginUser, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        loginUser(email, password);
    };

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <form onSubmit={e => onSubmit(e)}>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)} 
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(authActions.loginUserAction(email, password, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
