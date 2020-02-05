import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RosterTableActions from './RosterTableActions';
import { deletePlayerAction } from '../../redux/roster/rosterActions';

const Roster = ({ deletePlayer, roster }) => {
    const { players } = roster;

    const [ filteredPlayers, setFilteredPlayers ] = useState(players);

    const handleSearchTextChange = e => {
        const text = e.target.value.toLowerCase().replace(' ', '');
        const searchResult = text === '' ? players : filteredPlayers.filter(player => 
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
            sortResult = filteredPlayers.slice().sort((a, b) => (a.overall > b.overall) ? 1 : -1);
        } else {
            sortResult = filteredPlayers.slice().sort((a, b) => (a.overall < b.overall) ? 1 : -1);
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
            <RosterTableActions 
                handleFilterChange={handleFilterChange}
                handleSortByOverall={handleSortByOverall}
                handleSearchTextChange={handleSearchTextChange}
            />
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