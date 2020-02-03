import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updatePlayerAction } from '../../redux/roster/rosterActions';

const UpdatePlayer = ({ updatePlayer, history, match, roster }) => {
    const id = match.params.id;
    const player = roster.players.filter(player => player._id === id)[0];

    const [ formData, setFormData ] = useState({
        firstName: (player && player.firstName) ? player.firstName : '',
        lastName: (player && player.lastName) ? player.lastName : '',
        primaryPosition: (player && player.primaryPosition) ? player.primaryPosition : '',
        secondaryPosition: (player && player.secondaryPosition) ? player.secondaryPosition : '',
        potential: (player && player.potential) ? player.potential : '',
        overall: (player && player.overall) ? player.overall : ''
    });

    const { firstName, lastName, primaryPosition, secondaryPosition, potential, overall } = formData;

    const onSubmit = e => {
        e.preventDefault();
        updatePlayer(id, formData, history);
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            <h1 className="large text-primary">Create Player Form</h1>
            <p className="lead"><i className="fas fa-user"></i> Add a new player to your roster</p>
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
    );
};

const mapStateToProps = state => ({
    roster: state.roster
});

const mapDispatchToProps = dispatch => ({
    updatePlayer: (playerId, formData, history) => dispatch(updatePlayerAction(playerId, formData, dispatch, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdatePlayer));
