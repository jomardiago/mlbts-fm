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
                <div className="row">
                    <div className="col form-group">
                        <input 
                            id="firstName"
                            className="form-control"
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                    <div className="col form-group">
                        <input 
                            id="lastName"
                            className="form-control"
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <input 
                            id="primaryPosition"
                            className="form-control"
                            type="text"
                            name="primaryPosition"
                            placeholder="Enter Primary Position"
                            value={primaryPosition}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                    <div className="col form-group">
                        <input 
                            id="secondaryPosition"
                            className="form-control"
                            type="text"
                            name="secondaryPosition"
                            placeholder="Enter Secondary Position"
                            value={secondaryPosition}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <input 
                            id="year"
                            className="form-control"
                            type="number"
                            name="year"
                            placeholder="Enter Progress Year"
                            value={year}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                    <div className="col form-group">
                        <input 
                            id="league"
                            className="form-control"
                            type="text"
                            name="league"
                            placeholder="Enter Player's Current League"
                            value={league}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <input 
                            id="overall"
                            className="form-control"
                            type="number"
                            name="overall"
                            placeholder="Enter Overall"
                            value={overall}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                    <div className="col form-group">
                        <input 
                            id="potential"
                            className="form-control"
                            type="potential"
                            name="potential"
                            placeholder="Enter Potential"
                            value={potential}
                            onChange={e => onChange(e)} 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add New Player</button>
            </form>
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    createPlayer: (formData, history) => dispatch(createPlayerAction(formData, dispatch))
});

export default connect(null, mapDispatchToProps)(AddPlayer);
