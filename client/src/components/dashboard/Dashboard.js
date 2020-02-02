import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { loadRosterAction } from '../../redux/roster/rosterActions';

const Dashboard = ({ loadRoster, roster }) => {
    const { loading, players } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">FIrst Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Primary Position</th>
                    <th scope="col">Secondary Position</th>
                    <th scope="col">Potential</th>
                    <th scope="col">Overall</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(player => (
                        <tr>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{player.primaryPosition}</td>
                            <td>{player.secondaryPosition}</td>
                            <td>{player.potential}</td>
                            <td>{player.overall}</td>
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
    loadRoster: () => dispatch(loadRosterAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);