import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutAction } from '../../redux/auth/authActions';

const NavBar = ({ auth, logout }) => {
    const { isAuthenticated } = auth;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <Link className="navbar-brand" to="/">MLBTS - Franchise Manager</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {
                        !isAuthenticated ? (
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/roster">Roster</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={(e) => logout()}>Logout</Link>
                                </li>
                            </Fragment>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction())
});

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
