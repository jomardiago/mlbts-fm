import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

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
        overall: (player && player.overall) ? player.overall : '',
        league: (player && player.league) ? player.league : '',
        year: (player && player.year) ? player.year : '',
    });

    const { firstName, lastName, primaryPosition, secondaryPosition, potential, overall, league, year } = formData;

    const onSubmit = e => {
        e.preventDefault();

        const playerProgress = player.progression.filter(progress => progress.year === formData.year)[0];

        if (playerProgress) {
            if (playerProgress.potential !== formData.potential || playerProgress.overall !== formData.overall) {
                if (window.confirm('You are trying to update an existing progress year with updated potential or overall. Proceed?')) {
                    updatePlayer(id, formData, history);
                }
            }
        } else {
            updatePlayer(id, formData, history);
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Fragment>
            <Link to="/roster" className="btn btn-outline-primary">Back To Roster</Link>
            <form onSubmit={e => onSubmit(e)}>
                <div className="text-center">
                    <h1 className="large text-primary">Update Player Form</h1>
                    <p className="lead"><i className="fas fa-user"></i> Update player from your roster</p>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <input 
                            id="firstName"
                            className="form-control"
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            autoFocus
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
                <button type="submit" className="btn btn-primary">Update Player</button>
            </form>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    roster: state.roster
});

const mapDispatchToProps = dispatch => ({
    updatePlayer: (playerId, formData, history) => dispatch(updatePlayerAction(playerId, formData, dispatch, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdatePlayer));
