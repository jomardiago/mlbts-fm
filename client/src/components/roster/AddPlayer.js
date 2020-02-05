import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createPlayerAction } from '../../redux/roster/rosterActions';

const AddPlayer = ({ createPlayer, history }) => {
    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        primaryPosition: '',
        secondaryPosition: '',
        year: '',
        league: '',
        potential: '',
        overall: 0
    });

    const { firstName, lastName, primaryPosition, secondaryPosition, year, league, potential, overall } = formData;

    const onSubmit = e => {
        e.preventDefault();
        createPlayer(formData, history);
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Fragment>
            <Link to="/roster" className="btn btn-outline-primary">Back To Roster</Link>
            <form onSubmit={e => onSubmit(e)}>
                <div className="text-center">
                    <h1 className="large text-primary">Create Player Form</h1>
                    <p className="lead"><i className="fas fa-user"></i> Add a new player to your roster</p>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName"
                        className="form-control"
                        type="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName"
                        className="form-control"
                        type="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="primaryPosition">Primary Position</label>
                    <input 
                        id="primaryPosition"
                        className="form-control"
                        type="primaryPosition"
                        name="primaryPosition"
                        value={primaryPosition}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondaryPosition">Secondary Position</label>
                    <input 
                        id="secondaryPosition"
                        className="form-control"
                        type="secondaryPosition"
                        name="secondaryPosition"
                        value={secondaryPosition}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Roster Year</label>
                    <input 
                        id="year"
                        className="form-control"
                        type="year"
                        name="year"
                        value={year}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="league">League</label>
                    <input 
                        id="league"
                        className="form-control"
                        type="league"
                        name="league"
                        value={league}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="potential">Potential</label>
                    <input 
                        id="potential"
                        className="form-control"
                        type="potential"
                        name="potential"
                        value={potential}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="overall">Overall</label>
                    <input 
                        id="overall"
                        className="form-control"
                        type="overall"
                        name="overall"
                        value={overall}
                        onChange={e => onChange(e)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    createPlayer: (formData, history) => dispatch(createPlayerAction(formData, dispatch))
});

export default connect(null, mapDispatchToProps)(AddPlayer);
