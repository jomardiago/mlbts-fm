import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePlayerAction } from '../../redux/roster/rosterActions';

const Roster = ({ deletePlayer, roster }) => {
    const { players } = roster;

    const [ filteredPlayers, setFilteredPlayers ] = useState(players);

    const handleSearchTextChange = e => {
        const text = e.target.value.toLowerCase().replace(' ', '');
        const searchResult = text === '' ? players : players.filter(player => 
            player.firstName.toLowerCase().includes(text) || player.lastName.toLowerCase().includes(text) || 
            player.firstName.toLowerCase().concat(player.lastName.toLowerCase()).includes(text)
        );
        setFilteredPlayers(searchResult);
    };

    const handleFilterChange = e => {
        const text = e.target.value;
        const searchResult = text === '' ? players : 
        players.filter(player => player.primaryPosition.toLowerCase() === text.toLowerCase() || 
        player.league.toLowerCase() === text.toLowerCase());
        setFilteredPlayers(searchResult);
    };

    const handleSortByOverall = e => {
        const sortType = e.target.value;
        let sortResult;
        if (sortType === 'ascending') {
            sortResult = players.slice().sort((a, b) => (a.overall > b.overall) ? 1 : -1);
        } else {
            sortResult = players.slice().sort((a, b) => (a.overall < b.overall) ? 1 : -1);
        }
        setFilteredPlayers(sortResult);
    };

    const handleDelete = playerId => {
        if (window.confirm('Are you sure you want to remove player?')) {
            deletePlayer(playerId);
        }
    };

    return (
        <Fragment>
            <div className="roster-actions mb-2">
                <div className="row">
                    <div className="col col-sm-2">
                        <Link type="button" className="btn btn-outline-primary" to="/roster/create-player">Add New Player</Link>
                    </div>
                    <div className="col col-sm-4">
                        <div className="form-group">
                            <select className="form-control" id="filterByPosition" onChange={e => handleFilterChange(e)}>
                                <option value="">Filter By Position or League</option>
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
                                <option value="MLB">MLB</option>
                                <option value="AAA">AAA</option>
                                <option value="AA">AA</option>
                                <option value="A">A</option>
                            </select>
                        </div>
                    </div>
                    <div className="col col-sm-3">
                        <div className="form-group">
                            <select className="form-control" id="sortByOverall" onChange={e => handleSortByOverall(e)}>
                                <option value="">Sort By Overall</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="col col-sm-3">
                        <div className="form-group">
                            <input 
                                id="searchText"
                                name="searchText"
                                onChange={e => handleSearchTextChange(e)}
                                type="text"
                                className="form-control" 
                                placeholder="Search Table By Name"
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
                        <th scope="col">Overall</th>
                        <th scope="col">Potential</th>
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
                                <td>{player.overall}</td>
                                <td>{player.potential}</td>
                                <td>
                                    <Link to={`/roster/update-player/${player._id}`}>
                                        <i className="fas fa-pencil-alt text-dark"></i>
                                    </Link>
                                </td>
                                <td>
                                    <i className="fas fa-trash-alt" style={{ cursor: 'pointer' }} onClick={e => handleDelete(player._id)}></i>
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
    deletePlayer: (playerId) => dispatch(deletePlayerAction(playerId, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Roster);