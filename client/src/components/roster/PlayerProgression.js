import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PlayerProgression = ({ roster, match }) => {
    const { players } = roster;
    const player = players.filter(player => player._id === match.params.id)[0];
    player.progression.sort((a, b) => (a.year < b.year) ? 1 : -1);
    const otherPositionPlayers = players.filter(otherPositionPlayer => 
        otherPositionPlayer.primaryPosition === player.primaryPosition 
        //|| (otherPositionPlayer.secondaryPosition && otherPositionPlayer.secondaryPosition.includes(player.primaryPosition))
    ).sort((a, b) => (a.overall < b.overall) ? 1 : -1);

    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col col-sm-10">
                                    <h3>{player.firstName} {player.lastName}</h3>
                                </div>
                                <div className="col col-sm-2">
                                    <Link className="btn btn-primary ml-auto" to="/roster">Go Back</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row m-auto">
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Position: {player.primaryPosition}</strong></p>
                                </div>
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Secondary Position: {player.secondaryPosition}</strong></p>
                                </div>
                            </div>
                            <div className="row m-auto">
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Potential: {player.potential}</strong></p>
                                </div>
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Overall: {player.overall}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col col-sm-6">
                    <h5 className="text-center">Player Progression</h5>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Year</th>
                                <th>League</th>
                                <th>Potential</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                player.progression.map(progress => (
                                    <tr key={progress._id}>
                                        <td>{progress.year}</td>
                                        <td>{progress.league}</td>
                                        <td>{progress.potential}</td>
                                        <td>{progress.overall}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col col-sm-6">
                    <h5 className="text-center">Roster - {player.primaryPosition}</h5>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>League</th>
                                <th>Potential</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                otherPositionPlayers.map(oPlayer => (
                                    <tr key={oPlayer._id}>
                                        <td>{oPlayer.firstName}</td>
                                        <td>{oPlayer.lastName}</td>
                                        <td>{oPlayer.league}</td>
                                        <td>{oPlayer.potential}</td>
                                        <td>{oPlayer.overall}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    roster: state.roster
});

export default connect(mapStateToProps)(PlayerProgression);
