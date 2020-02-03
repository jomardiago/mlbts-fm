import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import { loadRosterAction, deletePlayerAction } from '../../redux/roster/rosterActions';

const Roster = ({ loadRoster, deletePlayer, roster }) => {
    const { loading, players } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
            <div className="roster-actions mb-2">
                <Link type="button" className="btn btn-outline-secondary" to="/roster/create-player">Add New Player</Link>
            </div>
            <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Primary Position</th>
                    <th scope="col">Secondary Position</th>
                    <th scope="col">Potential</th>
                    <th scope="col">Overall</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(player => (
                        <tr key={player._id}>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{player.primaryPosition}</td>
                            <td>{player.secondaryPosition}</td>
                            <td>{player.potential}</td>
                            <td>{player.overall}</td>
                            <td>
                                <Link to={`/roster/update-player/${player._id}`}>
                                    <i className="fas fa-pencil-alt text-dark"></i>
                                </Link>
                            </td>
                            <td>
                                <i className="fas fa-trash-alt" style={{ cursor: 'pointer' }} onClick={e => deletePlayer(player._id)}></i>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    roster: state.roster
});

const mapDispatchToProps = dispatch => ({
    loadRoster: () => dispatch(loadRosterAction()),
    deletePlayer: (playerId) => dispatch(deletePlayerAction(playerId, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Roster);