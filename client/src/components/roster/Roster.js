import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import { loadRosterAction, deletePlayerAction } from '../../redux/roster/rosterActions';

const Roster = ({ loadRoster, deletePlayer, roster }) => {
    const { loading, players } = roster;
    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    const [ filteredPlayers, setFilteredPlayers ] = useState();
    useEffect(() => {
        setFilteredPlayers(players);
    }, [players]);

    const handleSearchTextChange = e => {
        const text = e.target.value.toLowerCase();
        const searchResult = text === '' ? players : players.filter(player => 
            player.firstName.toLowerCase().includes(text) || player.lastName.toLowerCase().includes(text)  
        );
        setFilteredPlayers(searchResult);
    };

    const handleFilterByPosition = e => {
        const text = e.target.value;
        const searchResult = text === '' ? players : players.filter(player => player.primaryPosition.toLowerCase() === text.toLowerCase());
        setFilteredPlayers(searchResult);
    };

    return loading || !filteredPlayers ? <Spinner /> : (
        <Fragment>
            <div className="roster-actions mb-2">
                <div className="row">
                    <div className="col col-sm-2">
                        <Link type="button" className="btn btn-outline-secondary" to="/roster/create-player">Add New Player</Link>
                    </div>
                    <div className="col col-sm-5">
                        <div className="form-group">
                            <select className="form-control" id="filterByPosition" onChange={e => handleFilterByPosition(e)}>
                                <option value="">Filter By Position</option>
                                <option value="SP">SP</option>
                                <option value="RP">RP</option>
                                <option value="CP">CP</option>
                                <option value="C">C</option>
                                <option value="1B">1B</option>
                                <option value="2B">2B</option>
                                <option value="3B">3B</option>
                                <option value="SS">SS</option>
                                <option value="LF">LF</option>
                                <option value="CF">CF</option>
                                <option value="RF">RF</option>
                            </select>
                        </div>
                    </div>
                    <div className="col col-sm-5">
                        <div className="form-group">
                            <input 
                                id="searchText"
                                name="searchText"
                                onChange={e => handleSearchTextChange(e)}
                                type="text"
                                className="form-control" 
                                placeholder="Search Table"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">League</th>
                        <th scope="col">Year</th>
                        <th scope="col">Primary Position</th>
                        <th scope="col">Secondary Position</th>
                        <th scope="col">Potential</th>
                        <th scope="col">Overall</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPlayers.map(player => (
                            <tr key={player._id}>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{player.league}</td>
                                <td>{player.year}</td>
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
                                <td>
                                    <Link to={`/roster/player-progression/${player._id}`}>
                                        <i className="fas fa-eye text-dark"></i>
                                    </Link>
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